import React from "react";
import TradePlayerDetail from "./TradePlayerDetail.js"
import MyTeamTable from "./MyTeamTable.js"
import { Z_BLOCK } from "zlib";

export default class Trade extends React.Component {
    constructor(props) {
        super(props);

        this.tradeLogic = this.tradeLogic.bind(this);

        this.state = {
            selectedPlayer: this.props.selectedPlayer
        }
    }

    playerSelectedFromTable = (player) => {
        this.setState({selectedPlayer: player});
    }

    tradeLogic() {
        let isUserPlayer = this.props.isUserPlayer;
        let teams = this.props.teams;

        let cpuPlayer;
        let userPlayer;

        if (isUserPlayer) {
            cpuPlayer = this.state.selectedPlayer;
            userPlayer = this.props.player;
        } else {
            cpuPlayer = this.props.player;
            userPlayer = this.state.selectedPlayer;
        }

        // Rudimentary Logic
        let notStats = ["id", "name", "position", "salary", "team"]
        let count = 0
        for (const [key, value] of Object.entries(cpuPlayer)) {
            if (!notStats.includes(key)) {
                if (cpuPlayer[key] > userPlayer[key]) {
                    count += 1
                }
            }
        }

        if (count <= 3) {
            alert("Trade Successful");

            let tradeObject = {
                userPlayer: userPlayer,
                cpuPlayer: cpuPlayer
            }

            this.setState({selectedPlayer: null})

            this.props.tradeCompleted(tradeObject);
        } else {
            alert("Sorry, they don't think this is a fair trade.");
        }


    }

    render() {
        return(
            <div>
                <input id="cancel-trade" type="button" value="Cancel Trade" onClick={this.props.cancel}/>
                <div id="player-details">
                    <TradePlayerDetail player={this.props.isUserPlayer ? this.props.player : this.state.selectedPlayer} />
                    <TradePlayerDetail player={!this.props.isUserPlayer ? this.props.player : this.state.selectedPlayer} />
                </div>
                <input id="confirm-trade" type="button" value="Trade" onClick={this.tradeLogic} style={{display: this.state.selectedPlayer===null ? "none" : "block"}} />
                <div id="team-tables">
                    <p>Select a player you'd like to trade{this.props.isUserPlayer ? " for." : "."}</p>
                    <div id="user-team-table"
                    style={{display: this.props.isUserPlayer ? "block" : "none"}}
                    >
                        <MyTeamTable
                        players={this.props.players}
                        selectFunction={this.playerSelectedFromTable}
                        />
                    </div>
                    <div id="other-team-table"
                    style={{display: this.props.isUserPlayer ? "none" : "block"}} 
                    >
                        <MyTeamTable
                        players={this.props.players}
                        selectFunction={this.playerSelectedFromTable}
                        />
                    </div>
                </div>
            </div>
        )
    }
}