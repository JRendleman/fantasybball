import React from "react";
import DraftOverview from "./DraftOverview.js";
import DraftPlayerDetail from "./DraftPlayerDetail.js";
import DraftBoard from "./DraftBoard.js";import Firebase from "./firebase"
import "react-table/react-table.css"
import DraftPicksView from "./DraftPicksView.js";
import Lineup from "./Lineup.js";

require('firebase');
const firebase_client = new Firebase();
let player_names = firebase_client.db.ref("players");

// Function the pick number. 8 spots, 11 picks.
function getLowestPickNumber(pick) {
    if (pick > 8) {
        return pick - 8;
    } else {
        return pick;
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array
}

export default class Draft extends React.Component {
    constructor(props) {
        super(props);

        this.teams = [];
        this.draftOrder = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.draftPicks = [];

        this.state = {
            selectedPlayer: null,
            round: 1,
            pick: 1,
            currentTeamId: 1,
            isUser: false,
            players: [],
        };  
    }

    componentWillMount() {
        player_names.on('value', (snapshot) => {
            let players = [];
            if(snapshot.exists()) {
                snapshot.forEach((data) => {
                var val = data.val();
                players.push({
                    name: val.name,
                    ppg: val.ppg,
                    reb: val.reb,
                    ast: val.ast,
                    stl: val.stl,
                    blk: val.blk,
                    fg: val.fg,
                    tpt: val.tpt,
                    ft: val.ft,
                    to: val.to
                });
                    
                
        });        
    }
            console.log(players);
            this.setState({players: players});
        });
    }

    playerSelectedDraftBoard = (data) => {
        this.setState({selectedPlayer: data});
    }
    
    render() {

        return(
            <div>
                <DraftOverview 
                lowestPick={getLowestPickNumber(this.state.pick)}
                roundNumber = {this.state.round}
                />

                <DraftPlayerDetail 
                player={this.state.selectedPlayer}
                draftNumber={this.state.pick}
                />

                
                <div id="draft-board">
                <DraftBoard players={this.state.players} 
                playerSelectedDraftBoard={this.playerSelectedDraftBoard}
                />
                </div>
                <div id="draft-picks-view">
                <DraftPicksView 
                pickedPlayers={this.state.draftPicks}
                />
                </div>
                <div id="lineup-view">
                <Lineup 
                yourTeam = {[]}
                />
                </div>

            </div>
        )
    }
}