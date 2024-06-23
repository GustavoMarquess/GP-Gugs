// components/ProjectCard/index.tsx

import React from "react";
import { Projeto } from "../../types";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  projeto: Projeto;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projeto }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editar-projeto/${projeto.id}`); // Redireciona para a página de edição do projeto
    // Ou pode abrir um modal de edição aqui
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">{projeto.nome}</h2>
      <p>
        <strong>Responsável:</strong> {projeto.responsavelNome}
      </p>
      <p>
        <strong>Status:</strong> {projeto.status}
      </p>
      <button
        onClick={handleEditClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Editar
      </button>
    </div>
  );
};

export default ProjectCard;
