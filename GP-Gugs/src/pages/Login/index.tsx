import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import Layout from "../../components/layout";
import logo from "../../assets/GP.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setConfirmation(true);
      setError(null);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("Usuário não encontrado. Verifique seu email.");
          break;
        case "auth/wrong-password":
          setError("Senha incorreta. Verifique sua senha.");
          break;
        default:
          setError("Erro ao fazer login. Por favor, tente novamente.");
          break;
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setConfirmation(true);
      setError(null);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      setError("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border-t-8 border-blue-500">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-auto rounded-lg" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {confirmation && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
              Login realizado com sucesso!
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg bg-gray-200 text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg bg-gray-200 text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="Senha"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm italic">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Entrar
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGoogleLogin}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Acesse com sua conta Google
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
