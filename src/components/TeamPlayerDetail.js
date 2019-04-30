import React from "react";

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

export default class TeamPlayerDetail extends React.Component {

    tradePlayer() {
        this.props.tradeFunction(this.props.player);
    }

    render() {

        if (this.props.player === null) {
            return <div></div>
        }

        this.props.player.salary = 3.2;

        return(
            <div id="dpd">
                <div id="dpd-num-pos">
                    <div>
                        <span>{getPlayerPostion(this.props.player.position)}</span>
                    </div>
                </div>
                <div id="dpd-name-sal-team">
                    <div>
                        <h1>{this.props.player.name}</h1>
                        <span>${this.props.player.salary}M</span>
                        <span> {this.props.player.team}</span>
                        <br/>
                        <input type="button" value="TRADE" onClick={this.tradePlayer.bind(this)}/>
                    </div>
                </div>
                <div id="dpd-stats">
                    <h4>Season Stats</h4>
                    <div>
                        <p>PPG</p>
                        <p>{this.props.player.ppg}</p>
                    </div>
                    <div>
                        <p>REB</p>
                        <p>{this.props.player.reb}</p>
                    </div>
                    <div>
                        <p>AST</p>
                        <p>{this.props.player.ast}</p>
                    </div>
                    <div>
                        <p>STL</p>
                        <p>{this.props.player.stl}</p>
                    </div>
                    <div>
                        <p>BLK</p>
                        <p>{this.props.player.blk}</p>
                    </div>
                </div>
            </div>
        );
    }
}