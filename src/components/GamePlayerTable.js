import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class GamePlayerTable extends React.Component {
    constructor(props) {
        super(props);
        this.players = props.players;
    }

    fixPositions() {
        let players = this.props.players;

        players.forEach((player) => {
            if (player.position === "forward") {
                player.position = "F";
            }

            if (player.position === "center") {
                player.position = "C";
            }

            if (player.position === "guard") {
                player.position = "G";
            }
        });

        this.players = players;
    }

    render() {
        this.fixPositions()

        const columns = [
            {
                Header: "PLAYER",
                accessor: "name",
                minWidth: 200
            },
            {
                Header: "POS",
                accessor: "position",
                width: 60
            },
            {
                Header: "PPG",
                accessor: "ppg",
                width: 60
            },
            {
                Header: "REB",
                accessor: "reb",
                width: 60
            },
            {
                Header: "STL",
                accessor: "stl",
                width: 60
            },
            {
                Header: "BLK",
                accessor: "blk",
                width: 60
            },
            {
                Header: "FG%",
                accessor: "fg",
                width: 60
            },
            {
                Header: "3PT%",
                accessor: "tpt",
                width: 60
            },
            {
                Header: "FT%",
                accessor: "ft",
                width: 60
            },
            {
                Header: "TO",
                accessor: "to",
                width: 60
            }
        ]
        
        return (
                <ReactTable id="player-table" 
                    columns={columns}
                    defaultSorted={[{
                        id: "ppg",
                        desc: true,
                    }]}
                    data={this.players}
                    defaultPageSize={7}/>
        )
    }
}