import { useAuth } from "../contexts/authContext";
import App from "./app.routes";
import { Auth } from "./auth.routes";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <App /> : <Auth />;
};

export { Index };
