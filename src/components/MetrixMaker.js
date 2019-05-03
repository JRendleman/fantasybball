import React from "react"
import CreateNewReport from "./CreateNewReport.js"
import StatOptions from "./StatOptions.js"
import GraphOptions from "./GraphOptions.js"
import Filters from "./Filters.js"
import StatsTable from "./StatsTable.js"
import Graph from "./Graph.js"
import Firebase from "./firebase"

require('firebase');

const firebase_client = new Firebase();

let player_names = firebase_client.db.ref("players");

class MetrixMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            statOptions: null,
            graphType: null,
            playerData: null
        }
    }

    componentWillMount() {
        player_names.on('value', (snapshot) => {
            let players = [];
            if(snapshot.exists()) {
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
            this.setState({playerData: players});
    }); 
    }
   
    statOptionsCallback = (data) => {
        this.setState({statOptions: data});
    }
    
    graphOptionsCallback = (type) => {
        this.setState({graphType: type});
    }

    filterOptionsCallback = (type) => {
        this.setState({filter: type});
    }

    render() {
        console.log("Metric Maker State");
        console.log(this.state)
        return (
            <div  id="metrixMaker">
                <CreateNewReport />
                <div id="metrixLeft">
                    <div id="statTitle"><span>Player Value by Rebounds</span></div>

                    <div id="divider"><span>VIEWS</span></div>

                    <StatOptions 
                    statOptionsCallback={this.statOptionsCallback} 
                    graphType={this.state.graphType} 
                    />

                    <div id="divider"><span>VIEWS</span></div>

                    <GraphOptions 
                    graphOptionsCallback={this.graphOptionsCallback}
                    />

                    <div id="divider"><span> </span></div>

                    <Filters />
                </div>
                <div id="metrixRight">
                    <StatsTable 
                    playerData={this.state.playerData}
                    />

                    <Graph 
                    graphType ={this.state.graphType} 
                    playerData={this.state.playerData}
                    statOptions={this.state.statOptions}
                    />
                </div>
            </div>
        )
    }
}

export default MetrixMaker
