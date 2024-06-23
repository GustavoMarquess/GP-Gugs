import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { Projeto } from "../../types";
import Header from "../../components/Header";

const ProjetoDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjeto = async () => {
    if (!id) {
      console.error("ID do projeto não fornecido.");
      return;
    }

    try {
      const docRef = doc(db, "projetos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Omit<Projeto, "id">;
        setProjeto({ id: docSnap.id, ...data });
      } else {
        console.error("Projeto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar o projeto: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjeto();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!projeto) {
    return <div>Projeto não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4">{projeto.nome}</h1>
      <div className="mb-4">
        <strong>Responsável:</strong> {projeto.responsavelNome}
      </div>
      <div className="mb-4">
        <strong>Status:</strong> {projeto.status}
      </div>
      <div>
        <strong>Tarefas:</strong>
        <ul>
          {projeto.tarefas.map((tarefa) => (
            <li key={tarefa.id} className="p-2 bg-gray-100 rounded mb-2">
              <h4 className="text-md font-bold">{tarefa.name}</h4>
              <p>{tarefa.isCompleted ? "Concluída" : "A fazer"}</p>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/home">
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Voltar para Home
        </button>
      </Link>
    </div>
  );
};

export default ProjetoDetalhe;
