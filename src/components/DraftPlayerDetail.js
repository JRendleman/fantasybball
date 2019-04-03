import React from "react";

export default class DraftPlayerDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: props.draftNumber
        };
    }

    render() {

        if (this.props.player === null) {
            return <div></div>
        }

        this.props.player.salary = 3.2;
        this.props.player.team = "TEAM PLACEHOLDER";
        this.props.player.position = "POS";

        return(
            <div id="dpd">
                <div id="dpd-num-pos">
                    <div>
                        <span>#{this.state.number}</span>
                        <br/>
                        <span>{this.props.player.position}</span>
                    </div>
                </div>
                <div id="dpd-name-sal-team">
                    <div>
                        <h1>{this.props.player.name}</h1>
                        <span>${this.props.player.salary}M</span>
                        <span> {this.props.player.team}</span>
                        <br/>
                        <input type="button" value="COMPARE"/>
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