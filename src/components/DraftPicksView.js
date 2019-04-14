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
                width: 60
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
                    defaultSorted={[{
                        id: "pick",
                        asc: true,
                    }]}
                    data={this.props.pickedPlayers}
                    defaultPageSize={10}/>
        )
    }
}