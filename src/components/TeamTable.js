import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class TeamTable extends React.Component {
    constructor(props) {
        super(props);
        this.selectedTeam = {};
        this.teams = props.teams;

        this.state = {
            selected: props.teams[10]
        }
    }

    teamSelected() {
        this.props.selectFunction(this.selectedTeam);
    }

    addRecordAttribute() {
        let teams = this.teams;

        teams.forEach((team) => {
            let wins = team.wins;
            let losses = team.losses;
            team.record = String(wins) + " - " + String(losses);
        });

        this.teams = teams;
    }

    render() {
        const columns = [
            {
                Header: "RECORD",
                accessor: "record",
                width: 100
            },
            {
                Header: "TEAM",
                accessor: "name",
                minWidth: 120
            },
            
        ]
        
        this.addRecordAttribute();

        return (
                <ReactTable id="draft-board" 
                    columns={columns}
                    defaultSorted={[{
                        id: "record",
                        desc: true,
                    }]}
                    data={this.teams}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                          return {
                            onClick: (e) => {
                              this.selectedTeam = rowInfo.original;
                              this.teamSelected();
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
                          return {}
                        }
                      }
                    }
                    defaultPageSize={11}/>
        )
    }
}