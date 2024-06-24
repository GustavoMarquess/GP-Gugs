import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLightbulb, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/GP.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("theme-black");
    } else {
      body.classList.remove("theme-black");
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="mb-4">
      <nav
        className={`flex justify-between items-center py-4 px-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-green-500 text-white"
        }`}
      >
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-auto mr-5" />
          <Link to="/home" className="text-xl font-bold mr-5">
            Gerenciamento de Projetos
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/home" className="mr-4">
            Home
          </Link>
          <Link to="/pessoa" className="mr-4">
            Pessoas
          </Link>
          <button
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center mr-4 ${
              darkMode && "text-gray-800"
            }`}
            onClick={handleToggleTheme}
          >
            <FaLightbulb className="mr-2" />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
