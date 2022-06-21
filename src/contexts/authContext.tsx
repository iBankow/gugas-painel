import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/axios";
import { createStandaloneToast } from "@chakra-ui/react";
import theme from "../theme/theme";
import { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../types";
import { Loading } from "../pages/Loading/Loading";

export interface DataResponse<T> {
  data: T;
}

export interface LoginResponse {
  user: IUser;
  token: {
    expires_at: string;
    token: string;
    type: string;
  };
}

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(
    credentials: SignInCredentials
  ): Promise<AxiosResponse | AxiosError | any>;
  logout(): Promise<void>;
  isAuthenticated: boolean;
  user: IUser | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const TOKEN_API = "TOKEN_API";
const STORAGE_USER = "STORAGE_USER";
const { toast } = createStandaloneToast({
  theme,
});

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function loadStorageData() {
      setLoading(true);
      const storageUser = localStorage.getItem(STORAGE_USER);
      const storageToken = localStorage.getItem(TOKEN_API);

      if (storageToken && storageUser) {
        api.defaults.headers.common.Authorization = `Bearer ${storageToken}`;
        await api
          .get("users/me")
          .then(({ data }: AxiosResponse<IUser>) => {
            console.log(data);
            setUser(data);
            localStorage.setItem(STORAGE_USER, JSON.stringify(data));
          })
          .catch((error) => {
            console.log(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (!storageUser && !storageToken) {
        setLoading(false);
        setUser(null);
      }
    }
    loadStorageData();
  }, []);

  useEffect(() => {
    api.interceptors.response.use(undefined, (error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.clear();
          toast({
            title: "Sessao expirada.",
            description: "Faca o login novamente.",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
          localStorage.removeItem(STORAGE_USER);
          localStorage.removeItem(TOKEN_API);
        }
      }
      return Promise.reject(error);
    });
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      await api
        .post("/login", {
          email,
          password,
        })
        .then(({ data }: AxiosResponse<LoginResponse>) => {
          const { token, user } = data;
          setUser(user);
          api.defaults.headers.common.Authorization = `Bearer ${token.token}`;
          localStorage.setItem(STORAGE_USER, JSON.stringify({ user }));
          localStorage.setItem(TOKEN_API, token.token);
          resolve(data);
          setLoading(false);
        })
        .catch((erro: AxiosError) => {
          setLoading(false);
          reject(erro);
        });
    });
  }

  const navigate = useNavigate();

  async function logout() {
    setLoading(true);
    await api
      .post("/logout")
      .then(() => {
        localStorage.removeItem(STORAGE_USER);
        localStorage.removeItem(TOKEN_API);
        setUser(null);
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <AuthContext.Provider value={{ logout, user, signIn, isAuthenticated }}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
