import React from "react";

export default class DraftOverviewCell extends React.Component {
    constructor(props) {
        super(props);

        this.pickNumber = props.pickNumber;
        this.player = {
            name: "James Harden",
            team: "HOU",
            position: "SG"
        };
    }

    render() {
        return (
            <div id="draftOverviewCell">
                <p>Pick No. {this.pickNumber}</p>
                <p className="draftPlayerName">{this.player.name}</p>
                <p>{this.player.position} - {this.player.team}</p>
            </div>
        )
    }
}