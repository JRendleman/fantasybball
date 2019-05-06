import React from "react";
import TeamPlayerDetail from "./TeamPlayerDetail.js";
import MyTeamTable from "./MyTeamTable.js";
import TeamTable from "./TeamTable.js";
import Trade from "./Trade.js";
import "../css/MyTeam.css";

export default class MyTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: props.teams[10],
            teams: props.teams,
            selectedPlayer: props.teams[10].players[0],
            isTrading: false,
            userPlayer: true,
            tradingPlayers: props.teams[10].players,
        }
    }

    playerSelectedFromTable = (player) => {
        this.setState({selectedPlayer: player});
    }

    playerTraded = (player) => {
        let teams = this.props.teams;
        let isUserPlayer = this.state.selectedTeam.name === "You"

        let tradingPlayers = [];

        if (!isUserPlayer) {
            let players = teams[10].players;
                players.forEach((teamPlayer) => {
                    if (teamPlayer.position === player.position) {
                        tradingPlayers.push(teamPlayer);
                    }
            })
        } else {

            teams.forEach((team) => {
                if (team.name !== this.state.selectedTeam.name) {
                    let players = team.players;
                    players.forEach((teamPlayer) => {
                        if (teamPlayer.position === player.position) {
                            tradingPlayers.push(teamPlayer);
                        }
                    })
                }
            });
        }

        this.setState({
            isTrading: true,
            userPlayer: isUserPlayer,
            tradingPlayers: tradingPlayers,
        });
    }

    teamSelected = (team) => {
        let isUserTeam = false;
        if (team.name === "You") {
            isUserTeam = true;
        }
        this.setState({
            userPlayer: isUserTeam,
            selectedTeam: team,
            selectedPlayer: team.players[0]
        });
    }

    tradeCompleted = (trade) => {

        let userPlayer = trade.userPlayer
        let cpuPlayer = trade.cpuPlayer

        let newTeams = this.state.teams;

        for (let i = 0; i < newTeams.length; i++) {
            let team = newTeams[i];

            for (let j = 0; j < team.players.length; j++) {
                if (team.players[j] === cpuPlayer) {
                    team.players.splice(j, 1);
                    team.players.push(userPlayer);
                    newTeams[i] = team;
                    break;
                }
            }
        }

        let userTeam = newTeams[10]

        for (let i = 0; i < userTeam.players.length; i++) {
            if (userTeam.players[i] === userPlayer) {
                userTeam.players.splice(i, 1);
                userTeam.players.push(cpuPlayer);
                newTeams[10] = userTeam;
                break;
            }
        }

        this.setState({
            isTrading: false,
            teams: newTeams
        })

        this.props.trade(newTeams);
    }
    
    closeTradeDiv = () =>  {
        this.setState({
            isTrading: false,
        });
    }

    render() {
        return(
            <div id="my-team-wrapper">
                <h2 style={{display: this.props.justFinishedDraft ? "block" : "none",
            textAlign:"center", width: "80%"}}>Congratulations, you've completed the draft.
             Here's your team page where you can check out your players and make trades. 
             View your weekly games in the Schedule tab, and make informed decisions with the Metric Maker!
             </h2>
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
                    <TeamTable teams={this.state.teams}
                    isEndOfGame={false}
                    selectFunction={this.teamSelected}
                    />
                </div>
                <div id="trade-wrapper" style={{display: this.state.isTrading ? "block" : "none"}}>
                    <Trade 
                    isUserPlayer={this.state.userPlayer}
                    player={this.state.selectedPlayer}
                    selectedPlayer={null}
                    players={this.state.tradingPlayers}
                    cancel={this.closeTradeDiv}
                    tradeCompleted={this.tradeCompleted}
                    />
                </div>
            </div>
        )
    }
}