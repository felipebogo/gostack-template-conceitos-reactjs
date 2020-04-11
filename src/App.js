import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const resp = await api.post('repositories',{
      title:`Desafio node.js ${Date.now()}`,
      url:`http://github.com/blaBla${Date.now()}`,
      techs:["node.js","javaScript"]
    });

    setRepositories([... repositories,resp.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const idx = repositories.findIndex(rep => rep.id === id);
    if(idx >= 0){
      const reps = [... repositories];
      reps.splice(idx, 1);
      setRepositories(reps);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => {
          return (
            <li key={rep.id}>{rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
