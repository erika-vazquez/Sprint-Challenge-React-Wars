import React from 'react';

const CharacterList = (props) => {
    
    return(
        <div className="character-card">
            <h1>Character: </h1>
            <h2>{props.name}</h2>
            <h3>{props.gender}</h3>
            <h3>{props.height}</h3>
        </div>
    )
}
export default CharacterList 