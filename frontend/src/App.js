import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const carregarClientes = () => {
    axios
      .get('http://localhost:8080/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const cadastrarCliente = () => {
    if (!nome || !telefone || !email) {
      alert('Preencha nome, telefone e email.');
      return;
    }

    axios
      .post('http://localhost:8080/clientes', {
        nome,
        telefone,
        email,
      })
      .then(() => {
        alert('Cliente cadastrado com sucesso!');
        setNome('');
        setTelefone('');
        setEmail('');
        carregarClientes();
      })
      .catch(error => {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente.');
      });
  };

  return (
    <div className="pagina">
      <header className="topo">
        <h1>PetShop+</h1>
        <p>Cadastro e listagem de clientes</p>
      </header>

      <main className="container">
        <section className="card">
          <h2>Cadastro de Cliente</h2>

          <label>Nome do Cliente</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <label>Telefone</label>
          <input
            type="text"
            placeholder="Digite o telefone"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
          />

          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite o e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button onClick={cadastrarCliente}>Salvar Cliente</button>
        </section>

        <section className="card">
          <h2>Clientes Cadastrados</h2>

          {clientes.length === 0 ? (
            <p>Nenhum cliente cadastrado.</p>
          ) : (
            <ul className="lista-clientes">
              {clientes.map(cliente => (
                <li key={cliente.id}>
                  <strong>{cliente.nome}</strong>
                  <br />
                  {cliente.telefone}
                  <br />
                  {cliente.email}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
