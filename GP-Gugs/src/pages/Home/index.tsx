// pages/Home.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { Projeto } from "../../types";
import ProjectCard from "../../components/ProjectCard";
import Header from "../../components/Header";
import NovaPessoa from "../../components/Pessoa/";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [showNovaPessoa, setShowNovaPessoa] = useState(false); // Estado para controlar a exibição do modal

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

  useEffect(() => {
    fetchProjetos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/projeto")}
        >
          Novo Projeto
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowNovaPessoa(true)} // Mostra o modal ao clicar
        >
          Nova Pessoa
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
              />
            ))}
        </div>
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-4">Concluído</h2>
          {projetos
            .filter((p) => p.status === "Concluído")
            .map((projeto) => (
              <ProjectCard key={projeto.id} projeto={projeto} />
            ))}
        </div>
      </div>
      {/* Modal de Nova Pessoa */}
      {showNovaPessoa && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <NovaPessoa
              onAddPessoa={(novaPessoa) => {
                // Aqui você pode atualizar o estado de persons ou realizar outras ações necessárias
                console.log("Nova pessoa adicionada: ", novaPessoa);
                setShowNovaPessoa(false); // Fecha o modal ao adicionar pessoa
              }}
              onClose={() => setShowNovaPessoa(false)} // Função para fechar o modal
            />
          </div>
        </div>
      )}
      <Footer />;
    </div>
  );
};

export default Home;
