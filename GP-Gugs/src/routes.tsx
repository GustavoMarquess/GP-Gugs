import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { home } from "./pages/home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/produtos/:id",
        element: (
          <Private>
            <Produto />
          </Private>
        ),
      },
      {
        path: "/produtos",
        element: <Produtos />,
      },
      {
        path:"/carrinho",
        element:<Carrinho />
      },
      {
        path: "/favoritos",
        element: <Favoritos />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export { router };
