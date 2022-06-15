import { useAuth } from "../contexts/authContext";
import App from "./app.routes";
import { Auth } from "./auth.routes";

const Index = () => {
  const { user } = useAuth();

  console.log(user?.name)

  return user ? <App /> : <Auth />;
};

export { Index };
