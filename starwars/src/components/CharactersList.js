import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Grid, Card } from "semantic-ui-react";

const CharacterList = (props) => {
    
    return(
        <Grid  textAlign="center"
        style={{ height: "70vh", margin: "0 auto", marginTop: "40px" }}
        verticalAlign="middle"
        >
        <Card style={{ color:"yellow", backgroundColor:"black", border: "2px blue solid"}}>
            <h1>Starwars</h1>
            <h2>Name: {props.name}</h2>
            <h3>Gender: {props.gender}</h3>
            <h3>Height: {props.height}</h3>
        </Card>
        </Grid>
    )
}
export default CharacterList 
