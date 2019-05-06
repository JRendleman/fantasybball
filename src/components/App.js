import React from "react"
import Header from "./Header.js"
import Draft from "./Draft.js";
import MetrixMaker from "./MetrixMaker.js"
import Schedule from "./Schedule.js"
import Game from "./Game.js"
import MyTeam from "./MyTeam.js";
import EndGame from "./EndGame.js";

const schedule = [
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, null],
    [1, null, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [11, 1, 2, null, 4, 5, 6, 7, 8, 9, 10],
    [10, 11, 1, 2, 3, null, 5, 6, 7, 8, 9],
    [9, 10, 11, 1, 2, 3, 4, null, 6, 7, 8],
    [8, 9, 10, 11, 1, 2, 3, 4, 5, null, 7],
    [null, 8, 9, 10, 11, 1, 2, 3, 4, 5, 6],
    [6, 7, null, 9, 10, 11, 1, 2, 3, 4, 5],
    [5, 6, 7, 8, null, 10, 11, 1, 2, 3, 4],
    [4, 5, 6, 7, 8, 9, null, 11, 1, 2, 3],
    [3, 4, 5, 6, 7, 8, 9, 10, null, 1, 2]
]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: "Draft",
            currentWeek: 0,
            teams: [],
            justFinishedDraft: true,
        }
    }
    // Callback to Header.js to keep track of what page we're on.
    headerCallback = (data) => {
        this.setState({currentPage: data,
        justFinishedDraft:false});
    }

    // Callback from Draft.js, fires when the draft is completed.
    buildTeams = (teamData, teamPlayers, userTeam) => {
        let teams = [];
        for (let i = 0; i < teamData.length; i++) {
            let teamInfo = teamData[i]
            let players = teamPlayers[String(i + 1)]
            let teamSchedule = schedule[i]

            let team = {
                name: teamInfo.name,
                wins: 0,
                losses: 0,
                players: players,
                schedule: teamSchedule,
                teamInfo: teamInfo,
                isUser: false
            }

            teams.push(team);
        }

        let team = {
            name: "You",
            players: userTeam,
            wins: 0,
            losses: 0,
            schedule: schedule[10],
            teamInfo: null,
            isUser: true
        }

        teams.push(team);
        
        this.setState({
            currentPage: "My Team",
            teams: teams
        });
    }

    simulateCPUGames(teams, cpu) {
        let teamsAlreadyUpdated = []

        for (let i = 0; i < 11; i++) {
            let week = this.state.currentWeek;
            if (week > 10) {
                week = week % 11
            }

            let teamOneIndex = schedule[i][this.state.currentWeek] - 1;
            if (schedule[i][this.state.currentWeek] === null) { continue; }
            let teamTwoIndex = schedule[teamOneIndex][this.state.currentWeek] - 1;
            if (teamTwoIndex === null) { continue; }

            if (teamsAlreadyUpdated.includes(teamOneIndex) || teamsAlreadyUpdated.includes(teamTwoIndex)) {
                continue
            }

            let teamOne = teams[teamOneIndex];
            let teamTwo = teams[teamTwoIndex];
            let random = getRndInteger(0, 10);

            if (random >= 5) {
                teamOne.wins += 1;
                teamTwo.losses += 1;
            } else {
                teamTwo.wins += 1;
                teamOne.losses += 1;
            }

            teams[teamOneIndex] = teamOne
            teams[teamTwoIndex] = teamTwo
            teamsAlreadyUpdated.push(teamOneIndex, teamTwoIndex);
        }
        return teams
    }

    tradeFunction = (teams) => {
        this.setState({teams: teams});
    }

    biWeekSim = () => {
        let currentWeek = this.state.currentWeek + 1;
        let teams = this.state.teams;

        if (currentWeek > 10) {
            this.setState({
                currentPage: "End Game",
                currentWeek: 0,

            });
            return
        }

        teams = this.simulateCPUGames(teams, 10);

        this.setState({
            teams: teams,
            currentWeek: currentWeek
        });
    }

    gameStarted = (opposingTeam) => {
        this.setState({
            currentPage: "Game"
        });
    }

    gameCompleted = (winner, loser) => {
        let teams = this.state.teams;
        let currentWeek = this.state.currentWeek + 1
        teams[winner].wins += 1;
        teams[loser].losses += 1;

        let cpuAlreadyPlayed = winner === 10 ? loser : winner

        teams = this.simulateCPUGames(teams, cpuAlreadyPlayed)
        if (currentWeek > 10) {
            this.setState({
                currentPage: "End Game",
                currentWeek: 0,
            });
            return
        }

        this.setState({
            currentPage: "Schedule",
            teams: teams,
            currentWeek: currentWeek
        })
    }

    restartGame = () => {
        this.setState({
            currentPage: "Draft"
        });
    }

    render() {
        switch(this.state.currentPage) {
            case "Metric Maker":
                return (
                    <div>
                        <Header callback={this.headerCallback}
                        currentPage={this.state.currentPage}/>
                        <MetrixMaker />
                    </div>
                )
            case "Schedule":
                return (
                    <div>
                        <Header callback={this.headerCallback}
                        currentPage={this.state.currentPage}/>
                        <Schedule 
                        callback={this.headerCallback}
                        teams={this.state.teams}
                        schedule={schedule}
                        week={this.state.currentWeek}
                        biWeekSim={this.biWeekSim}
                        />
                    </div>
                )
            case "My Team":
                    return(
                        <div>
                            <Header callback={this.headerCallback}
                            currentPage={this.state.currentPage}/>
                            <MyTeam teams={this.state.teams}
                            trade={this.tradeFunction}
                            justFinishedDraft={this.state.justFinishedDraft}/>
                        </div>
                    )
            case "Draft":
                    return (
                        <div>
                            <Draft 
                            callback={this.buildTeams}
                            />
                        </div>
                    )
            case "Game":
                    return (
                        <div>
                            <Game
                            teams={this.state.teams} 
                            userOpponent={schedule[10][this.state.currentWeek % 11] - 1}
                            gameEnded={this.gameCompleted}
                            />
                        </div>
                    )

            case "End Game":
                    return (
                        <div>
                            <EndGame teams={this.state.teams}
                            restartGame={this.restartGame}/>
                        </div>
                    )
            default:
                return (
                    <div></div> 
                )
        }
    }
}

export default App