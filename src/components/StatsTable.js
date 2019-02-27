import React from "react"

var names = ["James Harden", "Russel Westbrook", "Anthony Davis", "James Harden", "LeBron James", "Victor Oladipo", "Paul George", "Ben Simmons", "John Wall"]
                      
function player() {
    this.name = "";
    this.rating = 0;
    this.points = 0;
    this.rebounds = 0;
    this.assists = 0;
    this.steals = 0;
    this.blocks = 0;
    this.fieldGoalPercentage = 0;
    this.threePointPercentage = 0;
    this.freeThrowPercentage = 0;
    this.turnovers = 0;
}

function StatsTable() {
    var array = []
    for (var i = 0; i < 9; i++) {
        var newPlayer = new player();
        newPlayer.name = names[i];
        newPlayer.rating = 92.4;
        newPlayer.rebounds = 2.4;
        newPlayer.points = 28.6;
        newPlayer.assists = 10.2;
        newPlayer.steals = 2.1;
        newPlayer.blocks = 0.2;
        newPlayer.fieldGoalPercentage = .486;
        newPlayer.threePointPercentage = .446;
        newPlayer.freeThrowPercentage = 86.6
        newPlayer.turnovers = 4.2
        array.push(newPlayer);
    };
    
    const listItems = array.map(player =>
        
        <tr key={player.name}>
            <td>{player.name}</td>
            <td>{player.rating}</td>
            <td>{player.points}</td>
            <td>{player.rebounds}</td>
            <td>{player.steals}</td>
            <td>{player.blocks}</td>
            <td>{player.fieldGoalPercentage}</td>
            <td>{player.threePointPercentage}</td>
            <td>{player.freeThrowPercentage}</td>
            <td>{player.turnovers}</td>
        </tr>
    );
    
    return (
        <div>
            <table id="statsTable">
                <thead>
                    <tr>
                    <th>PLAYER</th>
                    <th>RTG</th>
                    <th>PPG</th>
                    <th>REB</th>
                    <th>STL</th>
                    <th>BLK</th>
                    <th>FG%</th>
                    <th>3PT%</th>
                    <th>FT%</th>
                    <th>TO</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
    )
}


export default StatsTable