import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Container } from "semantic-ui-react";

import SWHeader from "./components/Header/SWHeader";
import SWCardGrid from "./components/Cards/SWCardGrid";
import Loading from "./components/Loading/Loading";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  const [people, setPeople] = useState();
  // TODO: ADD STATE FOR PAGES AND ID? PAGINATION STRETCH

  useEffect(() => {
    const fetchPeople = async () => {
      return await axios.get("https://swapi.co/api/people/");
    };

    fetchPeople()
      .then(res => {
        setPeople(res.data);
      })
      .catch(err => {
        console.log("Error has occurred: ", err);
      });
  }, []);

  console.log("List of people: ", people);

  return (
    <Container className="App">
      <SWHeader />
      {people ? <SWCardGrid people={people.results} /> : <Loading />}
    </Container>
  );
};

export default App;
