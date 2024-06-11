import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Pessoa } from "./pages/Pessoa";
import { Tarefa } from "./pages/Tarefa";
import { Home } from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/pessoa",
    element: <Pessoa />,
  },
  {
    path: "/tarefa",
    element: <Tarefa />,
  },
  {
    path: "/home",
    element: <Tarefa />,
  },
]);

export { router };
