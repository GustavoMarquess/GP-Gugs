// Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-6 bg-gray-200 text-gray-600">
      <p className="text-center">
        © {new Date().getFullYear()} Sistema de Gerenciamento de Projetos e
        Tarefas
      </p>
    </footer>
  );
};

export default Footer;
