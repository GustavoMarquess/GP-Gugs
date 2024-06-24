import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Projeto } from "../../types";
import ProjectCard from "../../components/ProjectCard";
import Header from "../../components/Header";
import NovaPessoa from "../../components/Pessoa/";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [showNovaPessoa, setShowNovaPessoa] = useState(false);

  useEffect(() => {
    fetchProjetos();
  }, []);

  const fetchProjetos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projetos"));
      const projetosData: Projeto[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Projeto)
      );
      setProjetos(projetosData);
    } catch (error) {
      console.error("Erro ao buscar projetos ", error);
    }
  };

  const handleUpdateStatus = async (
    projetoId: string,
    novoStatus: "A fazer" | "Fazendo" | "Concluído"
  ) => {
    try {
      const projetoRef = doc(db, "projetos", projetoId);
      await updateDoc(projetoRef, {
        status: novoStatus,
      });

      setProjetos((prevProjetos) =>
        prevProjetos.map((projeto) =>
          projeto.id === projetoId
            ? { ...projeto, status: novoStatus }
            : projeto
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status do projeto ", error);
    }
  };

  const handleDeleteProjeto = async (projetoId: string) => {
    try {
      const projetoRef = doc(db, "projetos", projetoId);
      await deleteDoc(projetoRef);

      setProjetos((prevProjetos) =>
        prevProjetos.filter((projeto) => projeto.id !== projetoId)
      );
    } catch (error) {
      console.error("Erro ao excluir projeto ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => navigate("/projeto")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Novo Projeto
        </button>
      </div>
      <div className="flex justify-between space-x-4">
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-4">A Fazer</h2>
          {projetos
            .filter((p) => p.status === "A fazer")
            .map((projeto) => (
              <ProjectCard
                key={projeto.id}
                projeto={projeto}
                onClick={() => handleUpdateStatus(projeto.id, "Fazendo")}
                onDelete={() => handleDeleteProjeto(projeto.id)} // Aqui você passa a função de deleção
              />
            ))}
        </div>
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-4">Fazendo</h2>
          {projetos
            .filter((p) => p.status === "Fazendo")
            .map((projeto) => (
              <ProjectCard
                key={projeto.id}
                projeto={projeto}
                onClick={() => handleUpdateStatus(projeto.id, "Concluído")}
                onDelete={() => handleDeleteProjeto(projeto.id)} // Aqui você passa a função de deleção
              />
            ))}
        </div>
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-4">Concluído</h2>
          {projetos
            .filter((p) => p.status === "Concluído")
            .map((projeto) => (
              <ProjectCard
                key={projeto.id}
                projeto={projeto}
                onDelete={() => handleDeleteProjeto(projeto.id)} // Aqui você passa a função de deleção
              />
            ))}
        </div>
      </div>
      {showNovaPessoa && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <NovaPessoa
              onAddPessoa={(novaPessoa) => {
                console.log("Nova pessoa adicionada: ", novaPessoa);
                setShowNovaPessoa(false);
              }}
              onClose={() => setShowNovaPessoa(false)}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
