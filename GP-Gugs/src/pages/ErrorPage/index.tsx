import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p>
        Parece que algo deu errado. Por favor, tente novamente mais tarde.”
        Lembre-se de que erros acontecem, mas estamos aqui para ajudar! 😊.
      </p>
      <p className="text-red-500">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
