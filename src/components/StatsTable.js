import React from "react"
import ReactTable from "react-table";

class StatsTable extends React.Component {
    render() {
        console.log("right over here " + this.props.age);
        
        if (this.props.playerData === null) {
            return <div></div>
        }

        const columns = [
            {
                Header: "PLAYER",
                accessor: "name",
                minWidth: 200
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
                <ReactTable id="react-table" 
                    columns={columns}
                    data={this.props.playerData}
                    defaultPageSize={10}/>
        )
    }
}

export default StatsTable