import React from "react";

function getPlayerPostion(pos) {
    switch (pos) {
        case "guard":
            return "G";
        case "center":
            return "C";
        case "forward":
            return "F";
        default:
            return "ERROR";
    }
}

export default class DraftOverviewCell extends React.Component {
    constructor(props) {
        super(props);

        this.pickNumber = props.pickNumber;
    }

    render() {
        if (this.props.player === null) {
            return(
                <div id="draftOverviewCell">
                
                </div>
            )
        } else {
            return (
                <div id="draftOverviewCell">
                    <p>Pick No. {this.props.player.pick}</p>
                    <p className="draftPlayerName">{this.props.player.name}</p>
                    <p>{getPlayerPostion(this.props.player.position)} - {this.props.player.team}</p>
                </div>
            )
        }

        
    }
}