import { useContext, useState } from 'react';
import { UserContext } from '../../context/usercontext';
import './styles.css';

export default function User() {
  const {email, nome, senha } = useContext(UserContext);
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  return (
    <form className="Flogin">
      <input
        type="text"
        placeholder="Nome"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="email"
        placeholder={email || "Email"}
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder={senha || "Senha"}
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />
    </form>
  );
}