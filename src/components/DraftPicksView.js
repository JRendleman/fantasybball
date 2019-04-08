import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class DraftPicksView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedPlayers: props.draftPicks
        }
    }

    render() {
        const columns = [
            {
                Header: "PICK",
                accessor: "pick",
                minWidth: 60
            },
            {
                Header: "PLAYER",
                accessor: "player",
                width: 175
            }
        ]

        return(
            <ReactTable id="draft-picks-view" 
                    columns={columns}
                    defaultSorted={[{
                        id: "pick",
                        asc: true,
                    }]}
                    data={this.state.pickedPlayers}
                    defaultPageSize={10}/>
        )
    }
}