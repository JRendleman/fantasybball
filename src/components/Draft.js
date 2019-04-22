import React from "react";
import DraftOverview from "./DraftOverview.js";
import DraftPlayerDetail from "./DraftPlayerDetail.js";
import DraftBoard from "./DraftBoard.js";
import Firebase from "./firebase"
import "react-table/react-table.css"
import DraftPicksView from "./DraftPicksView.js";
import Lineup from "./Lineup.js";

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
        this.retrievePlayers = this.retrievePlayers.bind(this);

        this.state = {
            selectedPlayer: null,
            round: 1,
            pick: 1,
            currentTeamId: 1,
            isUser: false,
            players: [],
            stat: '',
            valueOfStat: 'Enter value of stat here',
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
                <div id="draft-picks-view">
                <DraftPicksView 
                pickedPlayers={this.state.draftPicks}
                />
                </div>
                <div id="lineup-view">
                <Lineup 
                yourTeam = {[]}
                />
                <div className="example">
                    <form onSubmit={this.retrievePlayers}>
                        <span></span>
                        <select id='statID' onChange={this.handleChange}>
                            <option value="ast">Assists</option>
                            <option value="blk">Blocks</option>
                            <option value="fg">FG%</option>
                            <option value="ft">FT%</option>
                            <option value="name">Name</option>
                            <option value="player_id">Player ID</option>
                            <option value="position">Position</option>
                            <option value="ppg">PPG</option>
                            <option value="reb">Rebounds</option>
                            <option value="stl">Steals</option>
                            <option value="team">Team</option>
                            <option value="to">Turnovers</option>
                            <option value="tpt">3PT%</option>
                        </select>
                        <textarea id='valueOfStatID' value={this.state.valueOfStat} onChange={this.handleChange} />
                        <input type="submit" value="Retrieve player" />
                    </form>
                    <div className="preview">
                        <h1>Player info:</h1>
                        <div>{this.state.retrievedPlayer}</div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    handleChange(event) {
        if (event.target.id == 'statID') {
            this.setState({stat: event.target.value});
        } else if (event.target.id == 'valueOfStatID') {
            this.setState({valueOfStat: event.target.value})
        }
        // console.log("event target value: " + event.target.value);
        // console.log("event target: " + event.target.id);
    }

    retrievePlayers(event) {
        var childKey, childData, childDataAsString;
        var stat = this.state.stat;
        var valueOfStat = this.state.valueOfStat; //team name position

        //check to see if this stat is an number stat (i.e. NOT any of the string stats) so that it can be parsed
        if (!(stat.localeCompare('name') == 0 || stat.localeCompare('team') == 0 || stat.localeCompare('position') == 0)) { 
            valueOfStat = parseFloat(valueOfStat);
        }

        player_names.orderByChild(stat).equalTo(valueOfStat).on("child_added", function(snapshot) {
            player_names.orderByKey().equalTo(snapshot.key).once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    childKey = childSnapshot.key;
                    childData = childSnapshot.val();
                    // console.log("childSnapshot key: " + childSnapshot.key);
                    // console.log("childSnapshot value: " + childSnapshot.val());
                    childDataAsString += JSON.stringify(childData);
                })
            });
        });

        this.setState({retrievedPlayer: childDataAsString});
        event.preventDefault();
    }
    
    // handleSubmit(event) {
    //     alert('An essay was submitted: ' + this.state.stat);
    //     event.preventDefault();
    }