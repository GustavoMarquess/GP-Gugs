import { ReactNode, createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Use Auth must be used within an AuthProvider");
  }
  return context;
};
