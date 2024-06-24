import React from "react";
import { Projeto } from "../../types";
import { FaCalendarAlt, FaUser, FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { format } from 'date-fns';

interface ProjectCardProps {
  projeto: Projeto;
  onClick: () => Promise<void>;
  onDelete?: () => Promise<void>; // onDelete é opcional
  onEdit?: () => void; // onEdit para edição
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projeto, onClick, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 mb-2 rounded-lg shadow-md relative">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Projeto: {projeto.nome}</h2>
        <div className="mb-2 flex items-center">
          <FaUser className="text-gray-600 mr-2" />
          <span className="text-lg">{projeto.responsavelNome}</span>
        </div>
        <div className="mb-2 flex items-center">
          <FaCheckCircle className="text-green-600 mr-2" />
          <span className="text-lg">Status: {projeto.status}</span>
        </div>
        <div className="mb-2 flex items-center">
          <FaCalendarAlt className="text-blue-600 mr-2" />
          <span className="text-lg">Data: {format(new Date(projeto.dataConclusao), 'dd/MM/yyyy')}</span>
        </div>
      </div>
      <div className="absolute top-2 right-10">
        {onEdit && (
          <button className="text-gray-600 hover:text-gray-800 mr-4" onClick={onEdit}>
            <FaEdit className="text-xl" />
          </button>
        )}
        {onDelete && (
          <button className="text-red-600 hover:text-red-800" onClick={onDelete}>
            <FaTimesCircle className="text-xl" />
          </button>
        )}
      </div>
      <div className="flex justify-end p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
          Avançar
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
