import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class DraftBoard extends React.Component {
    constructor(props) {
        super(props);
        this.selectedPlayer = {}
        this.state = {
            players: props.players,
            selected: {}
        }
    }

    playerSelected() {
        this.props.playerSelectedDraftBoard(this.selectedPlayer);
    }

    render() {
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
                Header: "AST",
                accessor: "ast",
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
                <ReactTable id="draft-board" 
                    columns={columns}
                    defaultSorted={[{
                        id: "ppg",
                        desc: true,
                    }]}
                    data={this.props.players}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                          return {
                            onClick: (e) => {
                              this.selectedPlayer = rowInfo.original;
                              this.playerSelected();
                              this.setState({
                                selected: rowInfo.index
                              })
                            },
                            style: {
                              background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                              color: rowInfo.index === this.state.selected ? 'white' : 'black'
                            }
                          }
                        }else{
                          return{}
                        }
                      }
                    }
                    />
        )
    }
}