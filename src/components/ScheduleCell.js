import React from "react";
import "../css/ScheduleCell.css"

export default class ScheduleCell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    getTeam(i) {
        let teams = this.props.teamData
        return teams[i - 1].name
    }

    getRecord(i) {
        let teams = this.props.teamData;

        let wins = teams[i- 1].wins
        let losses = teams[i - 1].losses

        return String(wins) + " - " + String(losses)
    }

    handleClick(e) {
        this.props.startGame("Game")
    }


    render() {
        if (this.props.teamData.length === 0) {return(<div></div>)}

        if (this.props.isUser) {
            return(
                <div className="schedule-cell">
                <div id="teams">
                    <div id="team1">
                        <span>{this.getTeam(this.props.teamOne)}</span><br/>
                        <span id="record">{this.getRecord(this.props.teamOne)}</span>
                    </div>
                    <div id="team2">
                        <span>{this.getTeam(this.props.teamTwo)}</span>
                        <br/>
                        <span id="record">{this.getRecord(this.props.teamTwo)}</span>
                    </div>
                </div>
                <input type="button" value="Play Now" onClick={this.handleClick}/>
                </div>
            )
        } else {
            return(
                <div className="schedule-cell">
                    <div id="team1">
                        <span>{this.getTeam(this.props.teamOne)}</span><br/>
                        <span id="record">{this.getRecord(this.props.teamOne)}</span>
                    </div>
                    <div id="team2">
                        <span>{this.getTeam(this.props.teamTwo)}</span>
                        <br/>
                        <span id="record">{this.getRecord(this.props.teamTwo)}</span>
                    </div>
                </div>
            )
        }
    }
}