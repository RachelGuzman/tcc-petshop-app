import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [pets, setPets] = useState([]);
  const [nomePet, setNomePet] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [clienteId, setClienteId] = useState('');

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

  const carregarPets = () => {
    axios
      .get('http://localhost:8080/pets')
      .then(response => {
        setPets(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar pets:', error);
      });
  };

  useEffect(() => {
    carregarClientes();
    carregarPets();
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

  const cadastrarPet = () => {
    if (!nomePet || !especie || !raca || !idade || !clienteId) {
      alert('Preencha todos os campos do pet!');
      return;
    }

    axios
      .post('http://localhost:8080/pets', {
        nome: nomePet,
        especie,
        raca,
        idade,
        cliente: {
          id: clienteId,
        },
      })
      .then(() => {
        alert('Pet cadastrado com sucesso!');

        setNomePet('');
        setEspecie('');
        setRaca('');
        setIdade('');
        setClienteId('');

        carregarPets();
      })
      .catch(error => {
        console.error('Erro ao cadastrar pet:', error);
        alert('Erro ao cadastrar pet.');
      });
  };

  return (
    <div className="pagina">
      <header className="topo">
        <h1>🐾 PetShop+</h1>
        <p>Gerenciamento de clientes, pets, serviços e agendamentos.</p>
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
          <h2>Cadastro de Pet</h2>

          <label>Nome do Pet</label>
          <input
            type="text"
            placeholder="Digite o nome do pet"
            value={nomePet}
            onChange={e => setNomePet(e.target.value)}
          />

          <label>Espécie</label>
          <input
            type="text"
            placeholder="Digite a espécie"
            value={especie}
            onChange={e => setEspecie(e.target.value)}
          />

          <label>Raça</label>
          <input
            type="text"
            placeholder="Digite a raça"
            value={raca}
            onChange={e => setRaca(e.target.value)}
          />

          <label>Idade</label>
          <input
            type="number"
            placeholder="Digite a idade"
            value={idade}
            onChange={e => setIdade(e.target.value)}
          />

          <label>ID do Cliente</label>
          <input
            type="number"
            placeholder="Digite o ID do cliente"
            value={clienteId}
            onChange={e => setClienteId(e.target.value)}
          />

          <button onClick={cadastrarPet}>Salvar Pet</button>
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

        <section className="card">
          <h2>Pets Cadastrados</h2>

          {pets.length === 0 ? (
            <p>Nenhum pet cadastrado.</p>
          ) : (
            <ul>
              {pets.map(pet => (
                <li key={pet.id}>
                  <strong>{pet.nome}</strong> - {pet.especie}
                  <br />
                  Raça: {pet.raca}
                  <br />
                  Idade: {pet.idade}
                  <br />
                  Dono: {pet.cliente?.nome}
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
