import React from "react";

export default class DraftPlayerDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: props.player,
            number: props.draftNumber
        };
    }

    render() {
        return(
            <div id="dpd">
                <div id="dpd-num-pos">
                    <div>
                        <span>#{this.state.number}</span>
                        <br/>
                        <span>{this.state.player.position}</span>
                    </div>
                </div>
                <div id="dpd-name-sal-team">
                    <div>
                        <h1>{this.state.player.name}</h1>
                        <span>${this.state.player.salary}M</span>
                        <span> {this.state.player.team}</span>
                        <br/>
                        <input type="button" value="COMPARE"/>
                    </div>
                </div>
                <div id="dpd-stats">
                    <h4>Season Stats</h4>
                    <div>
                        <p>PPG</p>
                        <p>{this.state.player.ppg}</p>
                    </div>
                    <div>
                        <p>REB</p>
                        <p>{this.state.player.reb}</p>
                    </div>
                    <div>
                        <p>AST</p>
                        <p>{this.state.player.ast}</p>
                    </div>
                    <div>
                        <p>STL</p>
                        <p>{this.state.player.stl}</p>
                    </div>
                    <div>
                        <p>BLK</p>
                        <p>{this.state.player.blk}</p>
                    </div>
                </div>
            </div>
        );
    }
}