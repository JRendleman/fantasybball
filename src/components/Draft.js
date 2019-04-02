import React from "react";
import DraftOverview from "./DraftOverview.js";
import DraftPlayerDetail from "./DraftPlayerDetail.js"

// Function the pick number. 8 spots, 11 picks.
function getLowestPickNumber(pick) {
    if (pick > 8) {
        return pick - 8;
    } else {
        return pick;
    }
}

let player = {
    ppg: 26.8,
    reb: 8.6,
    ast: 6.4,
    stl: 1.8,
    blk: 1.2,
    salary: 2.4,
    position: "SF",
    name: "Kawhi Leonard",
    team: "San Antonio Spurs"
}

export default class Draft extends React.Component {
    constructor(props) {
        super(props);

        this.players = [];
        this.teams = [];
        this.draftOrder = [];

        this.state = {
            round: 1,
            pick: 1,
            currentTeamId: 1,
            isUser: false
        };  
    }

    render() {
        return(
            <div>
                <DraftOverview 
                lowestPick={getLowestPickNumber(this.state.pick)}
                roundNumber = {this.state.round}
                />
                <DraftPlayerDetail 
                player={player}
                draftNumber={this.state.pick}
                />
            </div>
        )
    }
}