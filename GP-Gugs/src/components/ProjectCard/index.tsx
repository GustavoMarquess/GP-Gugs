// components/ProjectCard.tsx

import React from "react";
import { Projeto } from "../../types";

interface ProjectCardProps {
  projeto: Projeto;
  onClick: () => Promise<void>;
  onShowTasks: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projeto,
  onClick,
  onShowTasks,
}) => {
  return (
    <div
      className={`bg-white p-4 mb-4 rounded-lg shadow-md ${
        document.body.classList.contains("theme-black") ? "text-white" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-2">{projeto.nome}</h2>
      <p className="mb-2">Responsável: {projeto.responsavelNome}</p>
      <p className="mb-2">Status: {projeto.status}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        Avançar
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={onShowTasks}
      >
        Tarefas
      </button>
    </div>
  );
};

export default ProjectCard;
