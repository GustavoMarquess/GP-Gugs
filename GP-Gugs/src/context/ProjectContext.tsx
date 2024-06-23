import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { Projeto } from "../types";

interface ProjetosContextProps {
  projetos: Projeto[];
  fetchProjetos: () => void;
}

const ProjetosContext = createContext<ProjetosContextProps | undefined>(
  undefined
);

export const ProjetosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

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

  useEffect(() => {
    fetchProjetos();
  }, []);

  return (
    <ProjetosContext.Provider value={{ projetos, fetchProjetos }}>
      {children}
    </ProjetosContext.Provider>
  );
};

export const useProjetos = () => {
  const context = useContext(ProjetosContext);
  if (!context) {
    throw new Error("useProjetos deve ser usado dentro de um ProjetosProvider");
  }
  return context;
};
