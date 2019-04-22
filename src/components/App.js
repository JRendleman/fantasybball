import React from "react"
import Header from "./Header.js"
import Draft from "./Draft.js";
import MetrixMaker from "./MetrixMaker.js"
import Schedule from "./Schedule.js"
import Game from "./Game.js"

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

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: "Schedule",
            records: [],
            teams: [],
            teamData: []
        }
    }
    // Callback to Header.js to keep track of what page we're on.
    headerCallback = (data) => {
        this.setState({currentPage: data});
    }

    buildTeams = (teamData, teamPlayers, userTeam) => {
        let teams = [];
        for (let i = 0; i < teamData.length; i++) {
            let teamInfo = teamData[i]
            let players = teamPlayers[String(i + 1)]
            let teamSchedule = schedule[i]

            let team = {
                name: teamInfo.name,
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
            schedule: schedule[10],
            teamInfo: null,
            isUser: true
        }
        teams.push(team);
        this.setState({
            currentPage: "Schedule",
            teams: teams
        });
    }

    gameStarted = (opposingTeam) => {

        this.setState({
            currentPage: "Game"
        })
    }

    render() {
        switch(this.state.currentPage) {
            case "Home":
                return(
                    <div>
                        <Draft 
                        callback = {this.buildTeams}
                        />
                    </div>
                )
            case "Metric Maker":
                return (
                    <div>
                        <Header callback={this.headerCallback}/>
                        <MetrixMaker />
                    </div>
                )
            case "Schedule":
                return (
                    <div>
                        <Header callback={this.headerCallback}/>
                        <Schedule 
                        callback={this.headerCallback}
                        teams={this.state.teams}/>
                    </div>
                )
            case "My Team":
                    return(
                        <div>
                            <Header callback={this.headerCallback}/>
                        </div>
                    )
            case "Draft":
                    return (
                        <div>
                            <Draft 
                            
                            />
                        </div>
                    )
            case "Game":
                    return (
                        <div>
                            <Game 
                            />
                        </div>
                    )
            default:
                return (
                    <div>

                    </div> 
                )
        }
    }
}

export default App