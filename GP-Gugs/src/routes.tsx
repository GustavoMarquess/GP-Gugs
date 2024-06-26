import { createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import { Pessoa } from "./pages/Pessoa";
import Home from "./pages/Home";
import Projeto from "./pages/Projeto";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pessoa",
    element: <Pessoa />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/projeto",
    element: <Projeto />,
    errorElement: <ErrorPage />,
  },
]);
const navigateToHome = () => {
  const navigate = useNavigate();
  navigate("/home"); // Navega para a rota /home
};
export default router;
