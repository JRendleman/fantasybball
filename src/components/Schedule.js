import React from "react";
import ScheduleCell from "./ScheduleCell.js"
import Firebase from "./firebase"
import "../css/Schedule.css"

require('firebase');
const firebase_client = new Firebase();
let team_names = firebase_client.db.ref("teams");

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

function getGames(week) {
    let games = []

    for (let i = 0; i < schedule.length; i++) {
        let teamSchedule = schedule[i]
        let opposingTeam = teamSchedule[week]

        if (!games.includes(opposingTeam) && !games.includes(i + 1) && opposingTeam !== null) {
            games.push(i + 1);
            games.push(opposingTeam);
        }
    }

    return games

}

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.schedule = schedule;
        this.state = {
            teamData: [],
            teams: [],
            userTeam: [],
        }
    }

    componentWillMount() {
        team_names.on('value', (snapshot) => {
            let teams = [];
            if(snapshot.exists()) {
                snapshot.forEach((data) => {
                    let val = data.val();
                    teams.push({
                        abbreviation: val.abbreviation,
                        name: val.name,
                        team_id: val.team_id,
                        total_salary: val.total_salary
                    })
                })
            }
            this.setState({
                teamData: teams
            })
        })
    }

    render() {
        const games = getGames(0)
        return(
            <div id="schedule">
                <div id="scheduleGames">
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[0]}
                    teamTwo = {games[1]}
                    teamData = {this.state.teamData}
                    isUser = {games[0] === 11 || games[1] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[2]}
                    teamTwo = {games[3]}
                    teamData = {this.state.teamData}
                    isUser = {games[2] === 11 || games[3] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[4]}
                    teamTwo = {games[5]}
                    teamData = {this.state.teamData}
                    isUser = {games[4] === 11 || games[5] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[6]}
                    teamTwo = {games[7]}
                    teamData = {this.state.teamData}
                    isUser = {games[6] === 11 || games[7] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[8]}
                    teamTwo = {games[9]}
                    teamData = {this.state.teamData}
                    isUser = {games[8] === 11 || games[9] === 11}
                    startGame = {this.props.callback}
                    />
                </div>
            </div>
        )
    }
}