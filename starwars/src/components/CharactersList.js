import React from 'react';

const CharacterList = (props) => {
    
    return(
        <div className="character-card">
            <h1>Starwars Character </h1>
            <h2>Name: {props.name}</h2>
            <h3>Gender: {props.gender}</h3>
            <h3>Height: {props.height}</h3>
        </div>
    )
}
export default CharacterList 
