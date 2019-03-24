import React from "react"
import ReactTable from "react-table";
import Firebase from "./firebase"
import "react-table/react-table.css"

require("firebase");

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
                accessor: "name"
            },
            {
                Header: "PPG",
                accessor: "ppg"
            },
            {
                Header: "REB",
                accessor: "reb"
            },
            {
                Header: "STL",
                accessor: "stl"
            },
            {
                Header: "BLK",
                accessor: "blk"
            },
            {
                Header: "FG%",
                accessor: "fg"
            },
            {
                Header: "3PT%",
                accessor: "tpt"
            },
            {
                Header: "FT%",
                accessor: "ft"
            },
            {
                Header: "TO",
                accessor: "to"
            }
        ]
        
        return (
                <ReactTable id="react-table" 
                    columns={columns}
                    data={this.state.data}/>
        )
    }
}


export default StatsTable