import { FormEvent, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setEmail: setAuthEmail } = useAuth();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Usuario e Senha não informados!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logado com Sucesso");
      setIsAuthenticated(true);
      setAuthEmail(email);
      navigate("/home", { replace: true });
    } catch (error) {
      alert("Usuario ou senha incorretas");
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <label>Usuario:</label>
        <input
          type="email"
          placeholder="meuemail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha:</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logar</button>
      </form>
    </>
  );
}
