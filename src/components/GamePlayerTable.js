import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class GamePlayerTable extends React.Component {
    constructor(props) {
        super(props);
        this.players = props.players;
        this.state = { 
            selected: {},
            selectedPlayers: [],
        };
		this.toggleRow = this.toggleRow.bind(this);
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

    toggleRow(player) {
        let selectedPlayers = this.state.selectedPlayers;

        if (selectedPlayers.includes(player)) {
            let index = selectedPlayers.indexOf(player);
            selectedPlayers.splice(index, 1);
        } else {
            selectedPlayers.push(player);
        }

		const newSelected = Object.assign({}, this.state.selected);
		newSelected[player.name] = !this.state.selected[player.name];
		this.setState({
            selected: newSelected,
            selectedPlayers: selectedPlayers,
        }, function () {
            this.props.subCallback(this.state.selectedPlayers);
        });
    }

    makeColumns() {
        let columns = [];

        if (this.props.isUser) {
            columns.push({
                Header: "SUB",
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={this.state.selected[original.name] === true}
                            onChange={() => this.toggleRow(original)}
                        />
                    );
                }
            });
        }

        columns.push({
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
        });

        return columns;
    }
    


    render() {
        this.fixPositions()

        const columns = this.makeColumns();
        
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