import React from "react";
import DraftOverview from "./DraftOverview.js";

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
                <DraftOverview />
            </div>

        )
    }
}