import React from "react"

function StatOptions() {
    return (
        <div id="statOptions">
            <table>
                <tr>
                    <td><input type="checkbox" value ="Salary"/>Salary</td>
                    <td><input type="checkbox" value ="Points"/>Points</td>
                    <td><input type="checkbox" value ="Steals"/>Steals</td>
                    <td><input type="checkbox" value ="FG%"/>FG%</td>
                </tr>
                <tr>
                    <td><input type="checkbox" value ="Rating"/>Ranking</td>
                    <td><input type="checkbox" value ="Rebounds"/>Rebounds</td>
                    <td><input type="checkbox" value ="Blocks"/>Blocks</td>
                    <td><input type="checkbox" value ="3-PT%"/>3-PT%</td>
                </tr>
                <tr>
                    <td><input type="checkbox" value ="Rank"/>Rank</td>
                    <td><input type="checkbox" value ="Assists"/>Assists</td>
                    <td><input type="checkbox" value ="Turnovers"/>Turnovers</td>
                    <td><input type="checkbox" value ="FT%"/>FT%</td>
                </tr>
            </table>
        </div>
        
    )
    
}

export default StatOptions