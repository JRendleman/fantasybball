import React from "react"



export default class StatOptions extends React.Component {
    constructor(props) {
        super(props);
        
        this.stats = [];
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        e.persist();
        let value = e.target.value;

        if (this.stats.includes(value)) {
            let index = this.stats.indexOf(value);
            this.stats.splice(index, 1);
            this.forceUpdate();
        } else {
            if (this.stats.length === 2 && this.props.graphType !== "lineStyle") {
                e.target.checked = false;
            } else {
                this.stats.push(value);
                this.forceUpdate();
            }
        }
        
        this.props.statOptionsCallback(this.stats);
    }
    
    render() {
        return (
            <div id="statOptions">
                <table>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" value ="Salary" onClick={this.handleClick.bind(this)}/>Salary</td>
                            <td><input type="checkbox" value ="Points" onClick={this.handleClick} />Points</td>
                            <td><input type="checkbox" value ="Steals" onClick={this.handleClick}/>Steals</td>
                            <td><input type="checkbox" value ="FG%" onClick={this.handleClick}/>FG%</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" value ="Rating" onClick={this.handleClick}/>Ranking</td>
                            <td><input type="checkbox" value ="Rebounds" onClick={this.handleClick}/>Rebounds</td>
                            <td><input type="checkbox" value ="Blocks" onClick={this.handleClick}/>Blocks</td>
                            <td><input type="checkbox" value ="3-PT%" onClick={this.handleClick}/>3-PT%</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" value ="Rank" onClick={this.handleClick}/>Rank</td>
                            <td><input type="checkbox" value ="Assists" onClick={this.handleClick}/>Assists</td>
                            <td><input type="checkbox" value ="Turnovers" onClick={this.handleClick}/>Turnovers</td>
                            <td><input type="checkbox" value ="FT%" onClick={this.handleClick}/>FT%</td>
                        </tr>
                    </tbody>
                </table>
                <p>Sorting by: {this.stats.join(", ")}</p>
            </div>
        )
    } 
}