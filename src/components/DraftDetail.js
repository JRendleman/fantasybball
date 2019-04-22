import React from "react";

export default class DraftDetail extends React.Component {
    getTeam() {
        return ("" + this.props.team + " selected " + this.props.player + " at #" + this.props.pick + ".")
    }

    getNextTeam() {
        return ("" + this.props.nextTeam + " on the clock.")
    }

    render() {
        let team = this.getTeam()
        let nextTeam = this.getNextTeam()


        if (this.props.isStart){
            return(
                <div id="draft-detail-wrapper">
                    <h1>
                        {nextTeam}
                    </h1>
                </div>
            )
        } else {
            return(
                <div id="draft-detail-wrapper">
                    <h1>
                        {team}
                    </h1>
                    <h2>
                        {nextTeam}
                    </h2>
                </div>
            )
        }
    }
}