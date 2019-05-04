import React from "react";
import ScheduleCell from "./ScheduleCell.js"
import "../css/Schedule.css"



export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.schedule = this.props.schedule;
    }

    getGames(week) {

        let games = []
    
        for (let i = 0; i < this.schedule.length; i++) {
            let teamSchedule = this.schedule[i]
            let opposingTeam = teamSchedule[week % 11]
    
            if (!games.includes(opposingTeam) && !games.includes(i + 1) && opposingTeam !== null) {
                games.push(i + 1);
                games.push(opposingTeam);
            }
        }

        console.log(games);
        console.log(this.props.teams);
    
        return games
    }

    userBiWeek() {
        let week = this.props.week
        
        let userSchedule = this.schedule[10][week % 11];

        if (userSchedule === null) {
            return "block";
        } else {
            return "none";
        }
    }

    render() {
        let games = this.getGames(this.props.week)
        return(
            <div id="schedule">
                <h2>Week {this.props.week + 1}</h2>
                <h2 style={{display: this.userBiWeek()}}>You have no games this week, click the button below.</h2>
                <input type="button" value="Sim Week" onClick={this.props.biWeekSim} style={{display: this.userBiWeek()}}/>
                <div id="scheduleGames">
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[0]}
                    teamTwo = {games[1]}
                    teamData = {this.props.teams}
                    isUser = {games[0] === 11 || games[1] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[2]}
                    teamTwo = {games[3]}
                    teamData = {this.props.teams}
                    isUser = {games[2] === 11 || games[3] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[4]}
                    teamTwo = {games[5]}
                    teamData = {this.props.teams}
                    isUser = {games[4] === 11 || games[5] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[6]}
                    teamTwo = {games[7]}
                    teamData = {this.props.teams}
                    isUser = {games[6] === 11 || games[7] === 11}
                    startGame = {this.props.callback}
                    />
                    <ScheduleCell week={this.props.week}
                    teamOne = {games[8]}
                    teamTwo = {games[9]}
                    teamData = {this.props.teams}
                    isUser = {games[8] === 11 || games[9] === 11}
                    startGame = {this.props.callback}
                    />
                </div>
            </div>
        )
    }
}