// Header.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/GP.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    document.body.classList.toggle("theme-black");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="mb-4">
      <nav className="flex justify-between items-center py-4 px-6 bg-green-500 text-white">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-auto mr-5" />

          <Link to="/home" className="text-xl font-bold">
            Gerencimento de Projetos
          </Link>
        </div>
        <div>
          <Link to="/home" className="mr-4">
            Home
          </Link>
          <Link to="/pessoa" className="mr-4">
            Pessoas
          </Link>
          <Link to="/projetos">Projetos</Link>
          <button
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleToggleTheme}
          >
            Tema Escuro
          </button>
          <button
            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
