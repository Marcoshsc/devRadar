import React, { useState, useEffect } from 'react';
import Form from './form/Form';
import DevCard from './devList/DevCard';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {

  const [devs, setDevs] = useState([])

  function handleDevAddition(dev) {
    setDevs(devs.concat([dev]));
  }

  useEffect(() => {
    async function getDevs() {
      const response = await fetch('http://localhost:3333/devs');
      const developers = await response.json();
      setDevs(developers);
    }
    getDevs();
  }, [])

  return (
    <div id="app">
      <aside>
        <Form value="Cadastrar" callback={handleDevAddition}/>
      </aside>
      <main>
        <ul id="devs">
          {devs.map((element) => {
            return <DevCard key={element._id} data={element}/>
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
