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
  onDelete?: () => Promise<void>; // onDelete é opcional
  darkMode?: boolean; // Adicione uma propriedade para o modo escuro
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projeto,
  onClick,
  onShowTasks,
  onDelete,
  darkMode = false, // Define darkMode como falso por padrão
}) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o projeto ${projeto.nome}?`
      )
    ) {
      onDelete && onDelete();
    }
  };

  return (
    <div
      className={`bg-white p-4 mb-2 rounded-lg shadow-md relative ${
        darkMode ? "bg-gray-800 text-white" : ""
      }`}
    >
      <div className="p-1">
        <h2
          className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Projeto: {projeto.nome}
        </h2>
        <div className="mb-4">
          <FaUser
            className={`inline-block mr-2 ${
              darkMode ? "text-white" : "text-gray-600"
            }`}
          />
          <span
            className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            Responsável: {projeto.responsavelNome}
          </span>
        </div>
        <div className="mb-4">
          <FaCheckCircle
            className={`inline-block mr-2 ${
              darkMode ? "text-green-400" : "text-gray-600"
            }`}
          />
          <span
            className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            Status: {projeto.status}
          </span>
        </div>
        <div className="mb-4">
          <FaCalendarAlt
            className={`inline-block mr-2 ${
              darkMode ? "text-yellow-400" : "text-gray-600"
            }`}
          />
          <span
            className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            Data: {new Date(projeto.dataConclusao).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        {onDelete && (
          <button
            className={`bg-gray-500 hover:bg-gray-700 p-2 rounded ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            onClick={handleDelete}
          >
            <FaTimesCircle
              className={`${darkMode ? "text-white" : "text-gray-800"}`}
            />
          </button>
        )}
      </div>
      <div className="flex justify-between p-4 mt-2">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2 ${
            darkMode ? "text-white" : ""
          }`}
          onClick={onClick}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
