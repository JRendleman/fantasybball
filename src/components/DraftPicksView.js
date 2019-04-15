import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class DraftPicksView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                Header: "PICK",
                accessor: "pick",
                width: 80
            },
            {
                Header: "PLAYER",
                accessor: "name",
                minWidth: 60
            }
        ]

        return(
            <ReactTable id="draft-picks-view" 
                    columns={columns}
                    data={this.props.pickedPlayers}
                    defaultPageSize={11}/>
        )
    }
}