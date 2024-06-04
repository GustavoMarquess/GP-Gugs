import { ReactNode, createContext, useEffect, useState } from "react";

interface UserProviderProps{
    children: ReactNode;
}

interface UserCotextData{
    email: string;
    senha: string;
    nome: string;
}

export const UserContext = createContext({}as UserCotextData);

export function UserProvider({ children }: UserProviderProps) {
  const localStorageKey = 'userData';
  const savedUserData = localStorage.getItem(localStorageKey);
  const initialUserData = savedUserData
    ? JSON.parse(savedUserData)
    : {
        nome: 'Administrador',
        
        email: 'adm@chocolate.com',
        senha: '123',
      };
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(userData));
  }, [userData]);
  
return(
    <UserContext.Provider value={{email: userData.email,nome:userData.nome,senha:userData.senha}}>
        {children}
    </UserContext.Provider>
)
}