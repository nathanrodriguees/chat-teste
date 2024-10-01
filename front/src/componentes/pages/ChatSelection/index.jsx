import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';
import axios from 'axios'; // Importar axios para fazer as requisições HTTP
import './style.css';

function ChatSelection() {
  const navigate = useNavigate();
  const { userName } = useUser();  // Obtém o nome do usuário do contexto
  const [comunidades, setComunidades] = useState([]);  // Estado para as comunidades existentes
  const [newComunidadeName, setNewComunidadeName] = useState('');  // Estado para o nome da nova comunidade
  const [isCreatingComunidade, setIsCreatingComunidade] = useState(false);  // Estado para alternar o formulário de criação

  useEffect(() => {
    // Buscar as comunidades existentes ao carregar o componente
    axios.get('http://localhost:8080/comunidades')
      .then(response => {
        setComunidades(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar comunidades:', error);
      });
  }, []);

  const enterComunidade = (comunidadeId) => {
    navigate(`/chat/${comunidadeId}`);
  };

  // Função para adicionar uma nova comunidade
  const addNewComunidade = (e) => {
    e.preventDefault();
    if (newComunidadeName.trim()) {
      axios.post('http://localhost:8080/comunidades', { nome: newComunidadeName.trim() }) // Aqui a correção
        .then(response => {
          setComunidades([...comunidades, response.data]); // Adicionar a nova comunidade ao estado
          setNewComunidadeName('');
          setIsCreatingComunidade(false); // Fechar o formulário após adicionar
        })
        .catch(error => {
          console.error('Erro ao criar nova comunidade:', error);
        });
    }
  };

  return (
    <section className="chat-selection">
      <h2>Bem-vindo, {userName}! Selecione uma Comunidade</h2> {/* Mostra o nome do usuário */}
      <div className="chat-selection__options">
        {comunidades.map((comunidade) => (
          <button key={comunidade.id} onClick={() => enterComunidade(comunidade.id)}>
            {/* Exibir o nome da comunidade */}
            <span>{comunidade.nome}</span>
          </button>
        ))}
        
        {/* Botão para adicionar nova comunidade */}
        {!isCreatingComunidade && (
          <button 
            onClick={() => setIsCreatingComunidade(true)} 
            className="chat-selection__add-button"
          >
            +
          </button>
        )}
        
        {/* Formulário para criar nova comunidade */}
        {isCreatingComunidade && (
          <form onSubmit={addNewComunidade} className="chat-selection__form">
            <input
              type="text"
              placeholder="Nome da nova comunidade"
              value={newComunidadeName}
              onChange={(e) => setNewComunidadeName(e.target.value)}
              required
            />
            <button type="submit">Criar</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default ChatSelection;
