import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const Layout = () => {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
