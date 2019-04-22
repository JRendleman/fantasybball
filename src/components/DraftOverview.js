import React from "react";
import DraftOverviewCell from "./DraftOverviewCell.js";
import "../css/DraftOverview.css"

export default class DraftOverview extends React.Component {

    getPlayer(index) {
        let players = this.props.draftedPlayers;
        let playerCount = players.length;
        
        if (playerCount - 7 > 0) {
            return players[playerCount - 8 + index];
        } else if (index < playerCount) {
            return players[index]
        } else {
            return null
        }
        
    }

    render() {
        return (
            <div id="draftOverview">
                <div id="draftRoundNumber"><span>Round {this.props.round}</span></div>
                <DraftOverviewCell 
                player={this.getPlayer(0)}
                />
                <DraftOverviewCell 
                player={this.getPlayer(1)}
                />
                <DraftOverviewCell 
                player={this.getPlayer(2)}
                />
                <DraftOverviewCell 
                player={this.getPlayer(3)}
                />
                <DraftOverviewCell 
                player={this.getPlayer(4)}
                />
                <DraftOverviewCell 
                player={this.getPlayer(5)}
                />
                <DraftOverviewCell 
                player={this.getPlayer(6)}
                />
                <DraftOverviewCell 
                player={this.getPlayer(7)}
                />
            </div>
        )
    }
}