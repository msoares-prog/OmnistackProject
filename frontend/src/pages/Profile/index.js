import React, { useState, useEffect }from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { FiPower } from 'react-icons/fi'
import { FiTrash2} from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: { Authorization: ongId }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Heroe" />
        <span>Bem vinda, APAD</span>
      <Link className="button" to="/newincident">
        Cadastrar novo caso
      </Link>
      <button type="button">
        <FiPower size={18} color="#e02041" />
      </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
      {incidentes.map(incidents =>  (
                <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
    
                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>
    
                <strong>VALOR:</strong>
                <p>
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL"
                  }).format(incident.value)}
                </p>
    
                <button
                  type="button"
                  onClick={() => handleDeleteIncident(incident.id)}
                >
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            ))}          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}