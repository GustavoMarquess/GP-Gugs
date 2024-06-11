import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
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
      const personsData: PersonProps[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as PersonProps)
      );
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
      const docRef = await addDoc(collection(db, "persons"), {
        name,
        email,
      });
      setPersons([
        ...persons,
        {
          id: docRef.id,
          name,
          email,
        },
      ]);
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
      await updateDoc(personDoc, {
        name,
        email,
      });
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
    setName(""), setEmail("");
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
    <>
      <label>Nome </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>E-mail</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={
          editingPerson
            ? () => handleUpdatePerson(editingPerson.id)
            : handleAddPerson
        }
      >
        {editingPerson ? "Salvar" : "Cadastrar"}
      </button>

      <button onClick={resetForm}>Limpar</button>

      <table>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ação</th>
        </tr>
        {persons.map((person) => (
          <tr key={person.id}>
            <th>{person.id}</th>
            <th>{person.name}</th>
            <th>{person.email}</th>
            <th>
              <button onClick={() => setEditingPerson(person)}>Editar</button>
              <button onClick={() => handleDeletePerson(person.id)}>
                Excluir
              </button>
            </th>
          </tr>
        ))}
      </table>
    </>
  );
};
