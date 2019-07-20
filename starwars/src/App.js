import React, { useState, useEffect } from 'react';
import './App.css';
import CharactersList from './components/CharactersList'
import axios from 'axios'
import { Container, Header, Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [char, setChar] = useState([]);

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
useEffect(() => {
  console.log("hello")
  axios
  .get('https://swapi.co/api/people/')
  .then(response =>{
    console.log(response.data.results)
    setChar(response.data.results);
  })

}, []);

  return (
    <Container style={{ width: "1280px"}}
    >
    <div className="App">
      <Header style={{ color: 'blue', fontSize:'50px',
  textShadow: '1px 1px 5px #fff'}}>React Wars</Header>
      {char.map((data, index) => (
        <CharactersList key={index} 
          name={data.name}
          height={data.height}
          gender={data.gender}
           /> 
      ))}   
    </div>
    </Container>
  );
}

export default App;
