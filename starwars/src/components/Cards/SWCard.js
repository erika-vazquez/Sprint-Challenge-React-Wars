import React from "react";
import { Card } from "semantic-ui-react";
import "./SWCard.css";

const SWCard = ({ character }) => {
  return (
    <Card className="sw-card">
      <Card.Content>
        <Card header={character.name} centered />
        <Card.Description>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Born:</strong> {character.birth_year}
          </p>
          <p>
            <strong>Eye Color:</strong> {character.eye_color}
          </p>
          <p>
            <strong>Hair Color:</strong> {character.hair_color}
          </p>
          <p>
            <strong>Height:</strong> {character.height}
          </p>
          <p>
            <strong>Mass:</strong> {character.mass}
          </p>
          <p>
            <strong>Skin Color:</strong> {character.skin_color}
          </p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default SWCard;
