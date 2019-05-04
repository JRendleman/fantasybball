import React from "react";

export default class TradePlayerDetail extends React.Component {

    render() {
        if (this.props.player === null) {
            return(<div></div>)
        } else {
            return(
                <div>
                    <h4>{this.props.player.name}</h4>
                    <p>Points: {this.props.player.ppg}</p>
                    <p>Rebounds: {this.props.player.reb}</p>
                    <p>Assists: {this.props.player.ast}</p>
                    <p>Steals: {this.props.player.stl}</p>
                    <p>Turnovers: {this.props.player.to}</p>
                </div>
            )
        }
    }
}