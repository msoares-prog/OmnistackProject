import React from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import api from "../../services/api";

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'

export default function Logon(){
    const [id, setId] = useState("");
  
    const history = useHistory();
  
    async function handleLogin(e) {
      e.preventDefault();
  
      try {
        const response = await api.post("/sessions", { id });
  
        localStorage.setItem("ongId", id);
        localStorage.setItem("ongName", response.data.name);
  
        history.push("/profile");
      } catch (err) {
        console.log(err);
        alert("Falha no login, tente novamente.");
      }
    }
  return (
    <div className="logon-container">
      <section className="form">
      <img src = {logoImg} alt='be the heroe' />

      <form onSubmit={handleLogin}>
        <h1>Faça seu Logon</h1>
        <input placeholder='Sua Id' />
        <button className="button" type="submit">Entrar</button>
        
        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#e02041" />
          Não tenho cadastro
        </Link>
      </form>
      </section>
      <img src={heroesImg} alt='heroes' />
    </div>
  );
}