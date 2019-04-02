import React from "react";
import DraftOverviewCell from "./DraftOverviewCell.js";

export default class DraftOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lowestPickToDisplay: props.lowestPick,
            roundNumber: props.roundNumber
        }
    }

    render() {
        return (
            <div id="draftOverview">
                <div id="draftRoundNumber"><h4>{this.state.roundNumber}</h4></div>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay}/>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay + 1}/>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay + 2}/>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay + 3}/>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay + 4}/>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay + 5}/>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay + 6}/>
                <DraftOverviewCell pickNumber={this.state.lowestPickToDisplay + 7}/>
            </div>
        )
    }
}