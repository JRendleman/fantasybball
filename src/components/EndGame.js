import React from "react";
import TeamTable from "./TeamTable.js"
import "../css/EndGame.css";

export default class EndGame extends React.Component {
    
    render() {
        return(
            <div id="end-game-container">
                <h2>The Season has ended!</h2>
                <p>
                    Congratulations on finishing the season. View overall standings below.
                </p>
                <TeamTable 
                teams={this.props.teams}
                isEndOfGame={true}
                />
                <input id="play-again" type="button" value="Play Again" onClick={this.props.restartGame} /> 
            </div>
        )
    }
}