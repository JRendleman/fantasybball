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

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
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
        this.draftOrder = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        this.isPlayersTurn = false;
        this.handleChange = this.handleChange.bind(this);
        this.retrievePlayers = this.retrievePlayers.bind(this);
        this.startDraft = this.startDraft.bind(this);

        this.state = {
            draftStarted: false,
            userTeam: [],
            selectedPlayer: null,
            round: 1,
            pick: 1,
            currentTeamId: 1,
            players: [],
            draftedPlayers: [],
            userID: 'Enter User ID here',
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
                    id: val.player_id,
                    ppg: val.ppg,
                    reb: val.reb,
                    ast: val.ast,
                    stl: val.stl,
                    blk: val.blk,
                    fg: val.fg,
                    tpt: val.tpt,
                    ft: val.ft,
                    to: val.to,
                    team: val.team,
                    position: val.position
                });
        });        
    }       players.sort(function(a, b) { 
            return a.ppg - b.ppg;
        })
            this.setState({players: players});
        });
    }

    playerSelectedDraftBoard = (data) => {
        this.setState({selectedPlayer: data});
    }

    playerPicked(player, players, pick, round, isUser) {
        let userTeam = this.state.userTeam

        // Check if the user is picking or not.
        if (isUser) {
            userTeam.push(player)
        }

        // Create draft board player to add to list.
        let draftBoardPlayer = {
            name: player.name,
            pick: pick,
            id: player.player_id,
            position: player.position,
            team: player.team
        }

        let draftedPlayers = this.state.draftedPlayers
        draftedPlayers.push(draftBoardPlayer)

        // Remove drafted player from player array.
        let index = players.indexOf(player);
        players.splice(index, 1);

        // Increment pick number and round if neccessary.
        let pickNumber = (this.state.pick + 1)
        let roundNumber = (this.state.round)

        if ((pickNumber % 12) === 0) {
            roundNumber += 1
            this.draftOrder = this.draftOrder.reverse()
        }

        // Update state.
        this.setState({
            pick: pickNumber,
            round: roundNumber,
            players: players,
            userTeam: userTeam,
            draftedPlayers: draftedPlayers,
        }, function () {
            this.advanceDraft(this.state.players, this.state.pick, this.state.round)
        });
    }

    // AI drafts player based on below logic.
    computerDraft(players, pick, round) {
        let playerToSelect = players[0]
        let nextHighestPpg = players[0]
        // Loop through players and select highest ppg.
        players.forEach(function(player) {
            if (player.ppg > playerToSelect.ppg) {
                nextHighestPpg = playerToSelect;
                playerToSelect = player;
            }
        });

        this.setState({
            selectedPlayer: nextHighestPpg
        })

        sleep(1000).then(() => {
            this.playerPicked(playerToSelect, players, pick, round, false)
        })
        
    }

    // Callback from DraftPlayerDetail.js. Draft button does nothing
    // if it is not user's turn.
    // Maybe add a prompt/alert to let the user know it's not their
    // turn.
    playerDrafted = (data) => {
        if (this.isPlayersTurn) {
            this.playerPicked(data, this.state.players, this.state.pick, this.state.round, true)
        } else {
            console.log("You're not on the clock.")
        }
        
    } 

    advanceDraft(players, pick, round) {
        let index = (pick % 11)
        let isPlayersTurn = this.draftOrder[index] === 1

        this.isPlayersTurn = isPlayersTurn

        if (!isPlayersTurn) {
            this.computerDraft(players, pick, round)
        } else {
            // Possibly show an alert to prompt the user to make a selection. 
            console.log("It is the user's turn to pick.")
        }
    }
    
    render() {
        if (this.state.draftStarted) {
            return(
                <div>
                    <DraftOverview 
                    draftedPlayers = {this.state.draftedPlayers}
                    round={this.state.round}
                    />
    
                    <DraftPlayerDetail 
                    player={this.state.selectedPlayer}
                    draftNumber={this.state.pick}
                    playerDrafted={this.playerDrafted}
                    isPlayersTurn={this.draftOrder[this.state.pick]===0}
                    />
    
                    <div id="draft-board">
                        <DraftBoard players={this.state.players} 
                        playerSelectedDraftBoard={this.playerSelectedDraftBoard}
                        />
                    </div>
    
                    <div id="draft-picks-view">
                        <DraftPicksView 
                        pickedPlayers={this.state.draftedPlayers}
                        />
                    </div>
    
                    <div id="lineup-view">
                        <Lineup 
                        userTeam={this.state.userTeam}
                        />
                    </div>
    
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
            )
        } else {
            return(
                <div id="startDraft">
                    <input type="button" value="START DRAFT" onClick={this.startDraft}/>
                    <br/>
                    <span>The draft order will be a random ordering of the 11 league teams. You will be alerted when it is your turn to pick.</span>
                </div>
            )
        }

        
    }

    startDraft() {
        this.setState({
            draftStarted: true,
            selectedPlayer: this.state.players[0]
        })

        this.advanceDraft(this.state.players, 1, 1)
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