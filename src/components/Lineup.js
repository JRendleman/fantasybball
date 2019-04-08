import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class Lineup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yourTeam: []
        }
    }

    render() {
        const columns = [
            {
                Header: "POS",
                accessor: "pos",
                minWidth: 60
            },
            {
                Header: "PLAYER",
                accessor: "player",
                width: 175
            }
        ]

        return(
            <ReactTable id="lineup-view" 
                    columns={columns}
                    defaultSorted={[{
                        id: "pick",
                        asc: true,
                    }]}
                    data={this.state.yourTeam}
                    defaultPageSize={10}/>
        )
    }
}