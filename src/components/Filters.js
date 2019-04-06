import React from "react"
import Firebase from "./firebase"

var admin = require("firebase");
const firebase_client = new Firebase();

// Get a database reference 
var db = admin.database();
var ref = db.ref('players');

var returnedQuery;

var players = [];

class Filters extends React.Component {
    constructor(props) {
        super(props);

        //this.handleClick = this.handleClick.bind(this);
        this.filter1 = this.filter1.bind(this);
        this.filter2 = this.filter2.bind(this);
        this.filter3 = this.filter3.bind(this);

        this.state = {
            filter: ""
        }
    }

    filter1() {
        var team = prompt("Order by which team?"); //example input: "LAL" or "GSW"

        ref.orderByChild("team").equalTo(team).on("child_added", function(snapshot) {
            returnedQuery = snapshot.key;
            alert(returnedQuery);
        });
        
    };

    // filter1() {
    //     //var team = prompt("Order by which team?"); //example input: "LAL" or "GSW"

    //     ref.orderByChild("player_id").on("child_added", function(snapshot) {
    //         returnedQuery = snapshot.key;
    //         alert(returnedQuery);
    //     });
    // };

    filter2() {
        var array = prompt("____ higher than _____? (Format: 'stat', 'number')"); //example input: "ppg, 25" or "stl, 2.1"
        var slicedArray = array.split(",");
        var stat = slicedArray[0];
        var num = slicedArray[1];

        ref.orderByChild(stat).startAt(parseInt(num)).on("child_added", function(snapshot) {
            returnedQuery = snapshot.key;
            alert(returnedQuery);
        });
    };

    filter3() {
        var top5stat = prompt("Top 5 of what stat?"); //example input: "ppg" or "3pt"

        ref.orderByChild(top5stat).limitToLast(5).on("child_added", function(snapshot) {
            returnedQuery = snapshot.key;
            alert(returnedQuery);
        });
    };

    // handleClick(e) {
    //     console.log(e);
    // }
    
    render() {
        return(
        <div id="filters">
            <input className="filterButtons" type="button" onClick={this.filter1} value="By Team"/>
            <input className="filterButtons" type="button" onClick={this.filter2} value="By Stats > X"/>
            <input className="filterButtons" type="button" onClick={this.filter3} value="By Top 5 of Stat"/>
            <input id="addFilter" type="button" value="Add Filter"/>
        </div>    
    )
    }
}

export default Filters

//            <input id="addFilter" type="button" value="Add Filter"/>