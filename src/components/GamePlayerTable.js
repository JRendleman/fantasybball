import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class GamePlayerTable extends React.Component {
    constructor(props) {
        super(props);
        this.players = props.players;
        this.state = { selected: {}, selectAll: 0};
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

    toggleRow(name) {
		const newSelected = Object.assign({}, this.state.selected);
		newSelected[name] = !this.state.selected[name];
		this.setState({
			selected: newSelected,
			selectAll: 2
		});
	}

    render() {
        this.fixPositions()

        const columns = [
            {
                Header: "SUB",
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={this.state.selected[original.name] === true}
                            onChange={() => this.toggleRow(original.name)}
                        />
                    );
                }
            },
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