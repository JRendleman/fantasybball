import React from "react";
import "../css/Draft.css"
import DraftOverview from "./DraftOverview.js";
import DraftPlayerDetail from "./DraftPlayerDetail.js";
import DraftBoard from "./DraftBoard.js";
import Modal from "./Modal.js"
import Firebase from "./firebase"
import "react-table/react-table.css"
import DraftPicksView from "./DraftPicksView.js";
import Lineup from "./Lineup.js";
import DraftDetail from "./DraftDetail";

require('firebase');
const firebase_client = new Firebase();
let player_names = firebase_client.db.ref("players");
let team_names = firebase_client.db.ref("teams");

var returnedQuery;

function getPlayerPostion(pos) {
    switch (pos) {
        case "guard":
            return "G";
        case "center":
            return "C";
        case "forward":
            return "F";
        default:
            return pos;
    }
}

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
        this.teams = {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [],
        "9": [], "10": [], "11": []};

        this.draftOrder = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        this.handleChange = this.handleChange.bind(this);
        this.retrievePlayers = this.retrievePlayers.bind(this);
        this.startDraft = this.startDraft.bind(this);

        this.state = {
            draftStarted: false,
            userTeam: [],
            teamData: [],
            selectedPlayer: null,
            round: 1,
            pick: 1,
            isPlayersTurn: false,
            showModal: false,
            players: [],
            draftedPlayers: [],

            // userID: 'Enter User ID here',
            // stat: '',
            // valueOfStat: 'Enter value of stat here',
            // retrievedPlayer: "" //all stats associated with player
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
                        position: getPlayerPostion(val.position)
                    });
                });        
            }       
            players.sort(function(a, b) { 
                return b.ppg - a.ppg;
            })
            this.setState({
                players: players
            })
        });

        team_names.on('value', (snapshot) => {
            let teams = [];
            if(snapshot.exists()) {
                snapshot.forEach((data) => {
                    let val = data.val();
                    teams.push({
                        abbreviation: val.abbreviation,
                        name: val.name,
                        team_id: val.team_id,
                        total_salary: val.total_salary
                    })
                })
            }
            this.setState({
                teamData: teams
            })
        })
    }

    // Player selected from draft board.
    playerSelectedDraftBoard = (data) => {
        this.setState({selectedPlayer: data});
    }

    // A player has been drafted from either the user or the AI.
    playerPicked(player, players, pick, round, isUser) {
        let userTeam = this.state.userTeam

        // Check if the user is picking or not.
        if (isUser) {
            userTeam.push(player)
        }
        
        let team = this.draftOrder[pick % 11]
        let teams = this.teams
        teams[String(team)].push(player)

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
        let index = this.draftOrder[pick % 11]
        let teams = this.teams
        let team = teams[String(index)]

        // Setup team needs and draft highest PPG of needed positions.
        let teamNeeds = {
            "guard": 2,
            "center": 1,
            "forward": 2
        }

        // Update team needs for current AI.
        team.forEach((player) => {
            let playerPosition = player.position;
            teamNeeds[playerPosition] = teamNeeds[playerPosition] - 1
        })

        let playerToSelect = players[0]
        // This object stores the next highest PPG player so
        // DraftOverview will have a draftable player.
        let nextHighestPpg = players[1]
        // Loop through players and select highest ppg.
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            if (teams[player.position] > 0) {
                playerToSelect = player;
                break
            }
        }

        // Update DraftOverview Player object.
        this.setState({
            selectedPlayer: nextHighestPpg
        })

        sleep(0).then(() => {
            this.playerPicked(playerToSelect, players, pick, round, false)
        })

        
    }

    // Callback from DraftPlayerDetail.js when a player is drafted.
    // Draft button does nothing if it is not user's turn.
    playerDrafted = (data) => {
        if (this.state.isPlayersTurn) {
            this.playerPicked(data, this.state.players, this.state.pick, this.state.round, true)
        } 
    } 

    advanceDraft(players, pick, round) {
        if (pick > 69) {
            this.props.callback(this.state.teamData, this.teams, this.state.userTeam);
            return
        }

        let index = (pick % 11)
        let isPlayersTurn = this.draftOrder[index] === 11

        // Update whether it is the user's turn or not.
        this.setState({
            isPlayersTurn: isPlayersTurn,
        })

        if (!isPlayersTurn) {
            this.computerDraft(players, pick, round)
        } else {
            this.openModalHandler() 
        }
    }

    // Modal Functions
    openModalHandler = () => {this.setState({showModal: true});}
    closeModalHandler = () => {this.setState({showModal: false});}

    // Used for the DraftDetail screens to get the team name of the current/next drafting team.
    getTeamName(isNext) {
        let index = (this.state.pick - isNext) % 11
        let teamIndex = this.draftOrder[index]

        if (teamIndex === 11) {
            if (isNext === 1) {return "You"} else{
                return "You are"}
        } else {
            if (isNext === 1) {
                return this.state.teamData[teamIndex - 1].name
            } else {
                return this.state.teamData[teamIndex - 1].name + " is"
            }
            
        }
    }

    getPlayerName() {
        if (this.state.draftedPlayers.length === 0) {
            return null
        } else {
            return this.state.draftedPlayers[this.state.draftedPlayers.length - 1].name
        }
    }
    
    render() {
        if (this.state.draftStarted) {
            return(
                <div onClick={this.closeModalHandler}>
                    <Modal 
                    header="You are on the clock."
                    isShowing={this.state.showModal}
                    close={this.closeModalHandler}
                    body={"Make your draft selection. Remember, you need a healthy mix of Centers, Forwards, and Guards."}
                    />

                    <DraftOverview 
                    draftedPlayers = {this.state.draftedPlayers}
                    round={this.state.round}
                    />
                    <DraftDetail 
                    team={this.getTeamName(1)}
                    player={this.getPlayerName()}
                    pick={this.state.pick - 1}
                    nextTeam={this.getTeamName(0)}
                    isStart={this.state.draftedPlayers.length === 0}
                    />
                    <DraftPlayerDetail 
                    player={this.state.selectedPlayer}
                    draftNumber={this.state.pick}
                    playerDrafted={this.playerDrafted}
                    isPlayersTurn={this.draftOrder[this.state.pick]===11}
                    />
    
                    <div id="draft-board">
                        <DraftBoard players={this.state.players} 
                        playerSelectedDraftBoard={this.playerSelectedDraftBoard}
                        />
                    </div>
    
                    <div id="draft-picks-view">
                        <DraftPicksView 
                        pickedPlayers={this.state.draftedPlayers}
                        round={this.state.round}
                        />
                    </div>
    
                    <div id="lineup-view">
                        <Lineup 
                        userTeam={this.state.userTeam}
                        />
                    </div>
    
                    <div className="example" style={{display: "none"}}>
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
                    <span>The draft order will be a random ordering of the 11 league teams. 
                    You will be alerted when it is your turn to pick. The draft also operates in a
                    snake draft format. This simply means that the draft order reverses each round.
                    For instance, if you have the first pick in the first round, you will have the last
                    pick in the second round. 
                    </span>
                    <p>Good Luck!</p>
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
        if (event.target.id === 'statID') {
            this.setState({stat: event.target.value});
        } else if (event.target.id === 'valueOfStatID') {
            this.setState({valueOfStat: event.target.value})
        }
        console.log("event target value: " + event.target.value);
        console.log("event target: " + event.target.id);
    }

    retrievePlayers(event) {
        var childKey, childData, childDataAsString;
        var stat = this.state.stat;
        var valueOfStat = this.state.valueOfStat; //team name position

        //check to see if this stat is an number stat (i.e. NOT any of the string stats) so that it can be parsed
        if (!(stat.localeCompare('name') === 0 || stat.localeCompare('team') === 0 || stat.localeCompare('position') === 0)) { 
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