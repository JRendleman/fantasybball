import React from "react";
import "../css/Game.css"
import GameCategoires from "./GameCategories.js";
import GamePlayerTable from "./GamePlayerTable.js";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.simQuarter = this.simQuarter.bind(this);
        this.getUserStarters = this.getUserStarters.bind(this);

        this.state = {
            quarter: 1,
            userScore: 0,
            cpuScore: 0,
            userStarters: [],
            userCategories: {
                ppg: 0,
                reb: 0,
                ast: 0,
                stl: 0,
                blk: 0,
                fg: 0.00,
                tpt: 0.00,
                ft: 0.00,
                to: 0
            },

            oppCategories: {
                ppg: 0,
                reb: 0,
                ast: 0,
                stl: 0,
                blk: 0,
                fg: 0.00,
                tpt: 0.00,
                ft: 0.00,
                to: 0
            }
        }
    }

    subCallback = (subs) => {
        this.setState({userStarters: subs});
    }

    getUserStarters() {
        let starters = this.state.userStarters;

        if (starters.length !== 5) {
            return false;
        }

        let teamNeeds = {
            "G": 2,
            "F": 2,
            "C": 1
        };

        let validStarters = [];

        starters.forEach((player) => {
            let playerPosition = player.position;

            if (teamNeeds[playerPosition] > 0) {
                teamNeeds[playerPosition] -= 1;
                validStarters.push(player);
            }
        });

        if (validStarters.length === 5) {
            return true;
        } else {
            return false;
        }
    }

    getStartersForTeam(team) {
        let players = [];
        
        let teamNeeds = {
            "guard": 2,
            "center": 1,
            "forward": 2,
            "G": 2,
            "F": 2,
            "C": 1
        };

        // Update team needs for current AI.
        team.players.forEach((player) => {
            let playerPosition = player.position;

            if (teamNeeds[playerPosition] > 0) {
                teamNeeds[playerPosition] -= 1;
                players.push(player);
            }
        });

        return players
    }



    calculateScore() {
        let userCats = this.state.userCategories;
        let oppCats = this.state.oppCategories;

        let userScore = 0;
        let cpuScore = 0;

        let notStats = ["id", "name", "position", "salary", "team"];

        for (const [key, value] of Object.entries(userCats)) {
            if (!notStats.includes(key)) {
                if (key === "to") {
                    if (value < oppCats[key]) {
                        userScore += 1
                    } else {
                        cpuScore += 1
                    }
                } else if (value > oppCats[key]) {
                    userScore += 1
                } else {
                    cpuScore += 1
                }
            }
        }

        this.setState({
            userScore: userScore,
            cpuScore: cpuScore
        })
    }

    randomizeStat(stat, statName) {
        let randomizer = getRndInteger(75, 125) / 100
        let percentages = ["tpt", "ft", "fg"];
        if (percentages.includes(statName)) {
            if (stat * randomizer > 100) {
                return 90.00
            }
            return (stat * randomizer)
        } else {
            return Math.ceil(stat * randomizer)
        }
    }

    decideWinner() {
        let winner = 0;
        let loser = 0;

        let userScore = this.state.userScore;
        let cpuScore = this.state.cpuScore;

        if (userScore > cpuScore) {
            winner = 10
            loser = this.props.userOpponent;
        } else {
            winner = this.props.userOpponent;
            loser = 10;
        }

        this.props.gameEnded(winner, loser);
    }

    simQuarter() {
        let quarterNum = this.state.quarter;

        if (quarterNum > 4) {
            this.decideWinner()
            return
        }

        let oppTeam = this.props.teams[this.props.userOpponent];
        let userStarters = this.state.userStarters;
        if (!this.getUserStarters()) {
            alert("Please choose exactly 5 players with 2 guards, 2 centers, 1 center.");
            return;
        };

        let oppStarters = this.getStartersForTeam(oppTeam)
        
        let notStats = ["id", "name", "position", "salary", "team"]

        let userCats = this.state.userCategories;
        userStarters.forEach((player) => {
            for (const [key, value] of Object.entries(player)) {
                if (!notStats.includes(key)) {
                    let randomizedStat = this.randomizeStat(value, key);
                    userCats[key] += randomizedStat;
                }
            }
        });

        let oppCats = this.state.oppCategories;

        oppStarters.forEach((player) => {
            for (const [key, value] of Object.entries(player)) {
                if (!notStats.includes(key)) {
                    let randomizedStat = this.randomizeStat(value, key);
                    oppCats[key] += randomizedStat;
                }
            }
        });

        userCats["tpt"] = parseFloat((userCats["tpt"]/(6)).toFixed(2))
        userCats["fg"] = parseFloat((userCats["fg"]/(6)).toFixed(2))
        userCats["ft"] = parseFloat((userCats["ft"]/(6)).toFixed(2))

        oppCats["tpt"] = parseFloat((oppCats["tpt"]/(6)).toFixed(2))
        oppCats["fg"] = parseFloat((oppCats["fg"]/(6)).toFixed(2))
        oppCats["ft"] = parseFloat((oppCats["ft"]/(6)).toFixed(2))

        quarterNum = quarterNum + 1

        this.setState({
            oppCategories: oppCats,
            userCategories: userCats,
            quarter: quarterNum,
        });

        this.calculateScore()
    }

    getButtonLabel() {
        let quarter = this.state.quarter;

        if (quarter === 1) {
            return "Start Game";
        } else if (quarter < 5) {
            return "Start Quarter " + String(quarter)
        } else {
            return "Return to Schedule";
        }
    }

    render() {
        return(
            <div id="game">
                <div id="game-timer"></div>
                <GameCategoires 
                userCats={this.state.userCategories}
                cpuCats={this.state.oppCategories}
                cpuName={this.props.teams[this.props.userOpponent].name}
                userScore={this.state.userScore}
                cpuScore={this.state.cpuScore}
                />
                <div id="user-players">
                <p>Choose 5 Starters by checking their boxes on the left. Make sure to choose 2 Guards, 2 Forwards, and 1 Center.</p>
                <GamePlayerTable 
                players={this.props.teams[10].players}
                isUser={true}
                subCallback={this.subCallback}
                />
                </div>
                <div id="cpu-players">
                <p></p>
                <GamePlayerTable 
                players={this.props.teams[this.props.userOpponent].players}
                isUser={false}
                />
                </div>
                <div id="start-game">
                    <input type="button" value={this.getButtonLabel()} onClick={this.simQuarter}/>
                </div>
            </div>
        )
    }
}