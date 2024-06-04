import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import "./styles.css";
import {useContext} from "react";
import { UserContext } from "../../context/usercontext";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Prencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert(`Logado com sucesso!`);
        navigate("/produtos", { replace: true });
      })
      .catch((error) => {
        alert(`Usuario e Senha Invalidos\n\nErro:${error}`);
        console.log(error);
      });
  }

  return (
    <main>
      <section className="login">
        <form className="formLogin" onSubmit={handleSubmit}>
          <h1>Usuário</h1>
       <input
            type="email"
            placeholder="seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}
