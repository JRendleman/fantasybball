import React from "react"
import ReactTable from "react-table";
import Firebase from "./firebase"
import "react-table/react-table.css"

require('firebase');

const firebase_client = new Firebase();

let player_names = firebase_client.db.ref("players");

var players = [];

class StatsTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: []
        }
    }
    
    componentWillMount() {
        player_names.on('value', (snapshot) => {
            console.log(snapshot.val())
            if(snapshot.exists()) {
                console.log(snapshot)
                snapshot.forEach((data) => {
                var val = data.val();
                players.push({
                    name: val.name,
                    ppg: val.ppg,
                    reb: val.reb,
                    ast: val.ast,
                    stl: val.stl,
                    blk: val.blk,
                    fg: val.fg,
                    tpt: val.tpt,
                    ft: val.ft,
                    to: val.to
                });
                    
                
        });
                
    }
            this.setState({data: players});
}); 
    }

    render() {
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
                    data={this.state.data}
                    defaultPageSize={10}/>
        )
    }
}

export default StatsTable