import React from "react";
import DraftOverview from "./DraftOverview.js";
import DraftPlayerDetail from "./DraftPlayerDetail.js";
import DraftBoard from "./DraftBoard.js";
import Firebase from "./firebase";
import "react-table/react-table.css";

require('firebase');
const firebase_client = new Firebase();
let player_names = firebase_client.db.ref("players");

var returnedQuery;

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

    return array;
}

export default class Draft extends React.Component {
    constructor(props) {
        super(props);

        this.teams = [];
        this.draftOrder = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.draftPicks = [];

        this.handleChange = this.handleChange.bind(this);
        this.retrievePlayerByID = this.retrievePlayerByID.bind(this);

        this.state = {
            selectedPlayer: null,
            round: 1,
            pick: 1,
            currentTeamId: 1,
            isUser: false,
            players: [],
            userID: 'Enter User ID here',
            retrievedPlayer: "" //all stats associated with player
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

                <div className="example">
                    <form onSubmit={this.retrievePlayerByID}>
                        <span></span>
                        <textarea value={this.state.userID} onChange={this.handleChange} />
                        <input type="submit" value="Retrieve player" />
                    </form>
                    <div className="preview">
                        <h1>Player info:</h1>
                        <div>{this.state.retrievedPlayer}</div>
                    </div>
                </div>

            </div>

        )
    }

    retrievePlayerByID(event) {
        var childKey, childData, childDataAsString;
        player_names.orderByChild("player_id").equalTo(parseInt(this.state.userID)).on("child_added", function(snapshot) {
            player_names.orderByKey().equalTo(snapshot.key).once('value', function(snapshot) {
                console.log(snapshot);
                snapshot.forEach(function(childSnapshot) {
                    childKey = childSnapshot.key;
                    childData = childSnapshot.val();
                    childDataAsString = JSON.stringify(childData);
                    console.log(typeof childDataAsString);
                })
            });
        });

        this.setState({retrievedPlayer: childDataAsString});

        //childData.forEach(function())
        
        //this.setState({retrievedPlayer: childData});
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({userID: event.target.value});
    }
    
    // handleSubmit(event) {
    //     alert('An essay was submitted: ' + this.state.userID);
    //     event.preventDefault();
    // }

}