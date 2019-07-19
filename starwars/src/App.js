import React, { useState, useEffect } from 'react';
import './App.css';
import CharactersList from './components/CharactersList'
import axios from 'axios'

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [data, setData] = useState({});

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
useEffect(() => {
  console.log("hello")
  axios
  .get('https://swapi.co/api/people/1/')
  .then(response =>{
    console.log(response.data)
    setData(response.data)
    
  })

}, []);

  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
    <CharactersList name={data.name}
    gender={data.gender}
    height={data.height}

    />
    </div>
  );
}

export default App;
