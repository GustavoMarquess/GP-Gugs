// components/ProjectCard.tsx

import React from "react";
import { Projeto } from "../../types";
import {
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Projeto: {projeto.nome}</h2>
        <div className="mb-4">
          <FaUser className="inline-block mr-2 text-gray-600" />
          <span className="text-lg">
            Responsável: {projeto.responsavelNome}
          </span>
        </div>
        <div className="mb-4">
          <FaCheckCircle className="inline-block mr-2 text-gray-600" />
          <span className="text-lg">Status: {projeto.status}</span>
        </div>
        <div className="mb-4">
          <FaCalendarAlt className="inline-block mr-2 text-gray-600" />
          <span className="text-lg">Data: {projeto.dataConclusao}</span>
        </div>
      </div>
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
