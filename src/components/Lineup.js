import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

function getPlayerPostion(pos) {
    switch (pos) {
        case "guard":
            return "G";
        case "G":
            return "G";
        case "center":
            return "C";
        case "C":
            return "C";
        case "forward":
            return "F";
        case "F":
            return "F";
        default:
            return "ERROR";
    }
}

export default class Lineup extends React.Component {
    changePositions() {
        this.props.userTeam.forEach((player) => {
            player.position = getPlayerPostion(player.position)
        })
    }

    render() {
        this.changePositions();
        const columns = [
            {
                Header: "POS",
                accessor: "position",
                width: 60
            },
            {
                Header: "PLAYER",
                accessor: "name",
                minWidth: 60
            }
        ]

        return(
            <ReactTable id="lineup-view" 
                    columns={columns}
                    defaultSorted={[{
                        id: "position",
                        asc: true,
                    }]}
                    data={this.props.userTeam}
                    defaultPageSize={10}/>
        )
    }
}