import React, { useState } from 'react';
import './styles.css'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

  async function handleRegister(e){
    e.preventDefaut();
    const data = {
      name,
      email,
      whatsapp,
      cidade,
      uf,
    }
    try {
        const response = api.post('ongs', data)
        alert('Seu ID de acesso é: ${ response.data.id }')
    }catch(err) {
        alert ('Erro no cadastro. Tente novamente')
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Heroe" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da ONG.</p>
                  
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#e02041" />
          Já sou cadastrado
        </Link>
        </section>
          <form onSubmit={handleRegister}>
          <input 
          placeholder="Nome da ONG" 
          value={name}
          enChange={e => setName(e.target.value)}
          />
          <input type="email" 
          placeholder="E-mail" 
          value={email}
          enChange={e => setEmail(e.target.value)}
          />
          <input 
          placeholder="WhatsApp"
          value={whatsapp}
          enChange={e => setWhatsapp(e.target.value)}
           />

          <div className="input-group">
            <input 
            placeholder="Cidade"           
            value={cidade}
            enChange={e => setCidade(e.target.value)}
            />
            <input 
            placeholder="UF"  style={{width: 80 } }
            value={uf}
            enChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  )
}