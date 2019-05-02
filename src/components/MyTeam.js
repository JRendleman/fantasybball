import React from "react";
import TeamPlayerDetail from "./TeamPlayerDetail.js";
import MyTeamTable from "./MyTeamTable.js";
import TeamTable from "./TeamTable.js";
import "../css/MyTeam.css";

export default class MyTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: props.teams[10],
            selectedPlayer: props.teams[10].players[0],
            isTrading: false,
            userPlayer: true
        }
    }

    playerSelectedFromTable = (player) => {
        this.setState({selectedPlayer: player});
    }

    playerTraded = (player) => {
        console.log(player);
        let isUserPlayer = this.state.selectedTeam.name === "You"
        this.setState({
            isTrading: true,
            userPlayer: isUserPlayer
        });
    }

    teamSelected = (team) => {
        let isUserTeam = false;
        if (team.name === "You") {
            isUserTeam = true;
        }
        this.setState({
            userPlayer: isUserTeam,
            selectedTeam: team
        });
    }

    render() {
        return(
            <div id="my-team-wrapper">
                <TeamPlayerDetail 
                player={this.state.selectedPlayer}
                tradeFunction={this.playerTraded}
                />
                <div id="team-player-table">
                    <MyTeamTable 
                        players={this.state.selectedTeam.players}
                        selectFunction={this.playerSelectedFromTable}
                    />
                </div>
                <div id="team-table">
                    <TeamTable teams={this.props.teams}
                    selectFunction={this.teamSelected}
                    />
                </div>
                <div id="trade-wrapper" style={{display: this.state.isTrading ? "block" : "none"}}>
                    
                </div>
            </div>
        )
    }
}