import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import Header from "../../components/Header";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const Pessoa: React.FC = () => {
  interface PersonProps {
    id: string;
    name: string;
    email: string;
  }

  const [persons, setPersons] = useState<PersonProps[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [editingPerson, setEditingPerson] = useState<PersonProps | null>(null);

  const fetchPersons = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "persons"));
      const personsData: PersonProps[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Pick<PersonProps, "name" | "email">), // Utiliza desestruturação para garantir que apenas as propriedades 'name' e 'email' são extraídas
      }));
      setPersons(personsData);
    } catch (error) {
      console.error("Error fetching persons. ", error);
    }
  };

  const handleAddPerson = async () => {
    if (!name || !email) {
      alert("Há campos não preenchidos!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "persons"), { name, email });
      setPersons([...persons, { id: docRef.id, name, email }]);
      resetForm();
    } catch (error) {
      console.error("Erro adding Person ", error);
    }
  };

  const handleUpdatePerson = async (id: string) => {
    if (!name || !email) {
      alert("Há campos não preenchidos!");
      return;
    }
    try {
      const personDoc = doc(db, "persons", id);
      await updateDoc(personDoc, { name, email });
      setPersons(
        persons.map((person) =>
          person.id === id ? { ...person, name, email } : person
        )
      );
      resetForm();
      setEditingPerson(null);
    } catch (error) {
      console.error("Erro updating Person ", error);
    }
  };

  const handleDeletePerson = async (id: string) => {
    try {
      const personDoc = doc(db, "persons", id);
      await deleteDoc(personDoc);
      setPersons(persons.filter((person) => person.id !== id));
    } catch (error) {
      console.error("Erro deleting Person ", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  useEffect(() => {
    if (editingPerson) {
      setName(editingPerson.name);
      setEmail(editingPerson.email);
    } else {
      resetForm();
    }
  }, [editingPerson]);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Cadastro de Pessoas</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            E-mail:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={
              editingPerson
                ? () => handleUpdatePerson(editingPerson.id)
                : handleAddPerson
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            {editingPerson ? "Salvar" : "Cadastrar"}
          </button>
          <button
            onClick={resetForm}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Limpar
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Pessoas Cadastradas</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">E-mail</th>
              <th className="px-4 py-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{person.id}</td>
                <td className="px-4 py-2">{person.name}</td>
                <td className="px-4 py-2">{person.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setEditingPerson(person)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletePerson(person.id)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pessoa;
