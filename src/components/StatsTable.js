import React from "react"
import ReactTable from "react-table";
import "react-table/react-table.css"


var names = ["James Harden", "Russel Westbrook", "Anthony Davis", "LeBron James", "Victor Oladipo", "Paul George", "Ben Simmons", "John Wall"]
var players = [];

function addPlayerData() {
    for (var i = 0; i < 8; i++) {
        players.push({
            player: names[i],
            rating: Math.floor((Math.random() * 10) + 80),
            rebounds: Math.floor((Math.random() * 11) + 1),
            points: Math.floor((Math.random() * 15) + 20),
            assists: Math.floor((Math.random() * 10) + 2),
            steals: Math.floor((Math.random() * 3) + 0),
            blocks: Math.floor((Math.random() * 2) + 1),
            fieldgoal: .486,
            threepoint: .446,
            freethrow: 86.6,
            turnovers: Math.floor((Math.random() * 4) + 0)
            
        })
    }
}

addPlayerData();

class StatsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                Header: "PLAYER",
                accessor: "player"
            },
            {
                Header: "RTG",
                accessor: "rating"
            },
            {
                Header: "PPG",
                accessor: "points"
            },
            {
                Header: "REB",
                accessor: "rebounds"
            },
            {
                Header: "STL",
                accessor: "steals"
            },
            {
                Header: "BLK",
                accessor: "blocks"
            },
            {
                Header: "FG%",
                accessor: "fieldgoal"
            },
            {
                Header: "3PT%",
                accessor: "threepoint"
            },
            {
                Header: "FT%",
                accessor: "freethrow"
            },
            {
                Header: "TO",
                accessor: "turnovers"
            }
        ]
        
        return (
                <ReactTable id="react-table" 
                    columns={columns}
                    data={players}/>
        )
    }
}


export default StatsTable