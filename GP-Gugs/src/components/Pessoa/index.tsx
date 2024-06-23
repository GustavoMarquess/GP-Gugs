import React, { useState, useEffect } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";

interface NovaPessoaProps {
  onAddPessoa: (id: string, nome: string) => void;
  onClose: () => void;
}

const NovaPessoa: React.FC<NovaPessoaProps> = ({ onAddPessoa, onClose }) => {
  const [pessoas, setPessoas] = useState<{ id: string; nome: string }[]>([]);
  const [selecionado, setSelecionado] = useState<{
    id: string;
    nome: string;
  } | null>(null);

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
        console.error("Erro ao buscar pessoas: ", error);
      }
    };

    fetchPessoas();
  }, []);

  const handleSelecionarPessoa = (id: string, nome: string) => {
    setSelecionado({ id, nome });
  };

  const handleConfirmarSelecao = () => {
    if (selecionado) {
      onAddPessoa(selecionado.id, selecionado.nome);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Selecione a Pessoa</h2>
      {pessoas.map((pessoa) => (
        <div
          key={pessoa.id}
          className={`cursor-pointer p-2 mb-2 rounded-lg ${
            selecionado?.id === pessoa.id ? "bg-blue-200" : ""
          }`}
          onClick={() => handleSelecionarPessoa(pessoa.id, pessoa.nome)}
        >
          {pessoa.nome}
        </div>
      ))}
      <div className="flex justify-end">
        <button
          onClick={handleConfirmarSelecao}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          disabled={!selecionado}
        >
          Confirmar Seleção
        </button>
      </div>
    </div>
  );
};

export default NovaPessoa;
