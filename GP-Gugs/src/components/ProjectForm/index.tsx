import React, { useState, useEffect } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import Select from "react-select";

import NovaPessoa from "../Pessoa";

interface PersonProps {
  id: string;
  nome: string;
}

const ProjectForm: React.FC = () => {
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState<PersonProps | null>(null); 
  const [dataConclusao, setDataConclusao] = useState("");
  const [status, setStatus] = useState("A fazer");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pessoas, setPessoas] = useState<PersonProps[]>([]);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "persons"));
        const pessoasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nome: doc.data().name,
        }));
        setPessoas(pessoasData);
      } catch (error) {
        console.error("Erro ao buscar resposanveis: ", error);
      }
    };

    fetchPessoas();
  }, []);

  const handleAddProjeto = async () => {
    if (!nome || !responsavel?.id || !responsavel?.nome) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
    try {
      await addDoc(collection(db, "projetos"), {
        nome,
        responsavelId: responsavel.id,
        responsavelNome: responsavel.nome,
        dataConclusao,
        status,
        tarefas: [],
      });
      return <Navigate to="/home" />;
    } catch (error) {
      console.error("Erro ao adicionar projeto: ", error);
    }
  };

  const options = pessoas.map((pessoa) => ({
    value: pessoa.id,
    label: pessoa.nome,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Novo Projeto</h2>
      <label>Nome</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      />
      <label>Responsável</label>
      <Select
        options={options}
        value={
          responsavel
            ? { value: responsavel.id, label: responsavel.nome }
            : null
        }
        onChange={(selectedOption: any) => {
          const selectedPerson = pessoas.find(
            (pessoa) => pessoa.id === selectedOption.value
          );
          setResponsavel(selectedPerson || null);
        }}
      />
      <label>Data de Conclusão (opcional)</label>
      <input
        type="text"
        value={dataConclusao}
        onChange={(e) => setDataConclusao(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      />
      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      >
        <option value="A fazer">A fazer</option>
        <option value="Fazendo">Fazendo</option>
        <option value="Concluído">Concluído</option>
      </select>
      <button
        onClick={handleAddProjeto}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Adicionar Projeto
      </button>

      {mostrarModal && (
        <NovaPessoa
          onAddPessoa={(id: string, nome: string) => {
            setResponsavel({ id, nome });
            setMostrarModal(false);
          }}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
};

export default ProjectForm;
