import React from "react";
import SWCard from "./SWCard";
import { Card } from "semantic-ui-react";

const SWCardGrid = ({ people }) => {
  return (
    <Card.Group centered itemsPerRow={2}>
      {people.map((character, index) => {
        return <SWCard key={index} character={character} />;
      })}
    </Card.Group>
  );
};

export default SWCardGrid;
