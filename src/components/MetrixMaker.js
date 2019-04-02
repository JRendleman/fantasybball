import React from "react"
import CreateNewReport from "./CreateNewReport.js"
import StatOptions from "./StatOptions.js"
import GraphOptions from "./GraphOptions.js"
import Filters from "./Filters.js"
import StatsTable from "./StatsTable.js"
import Graph from "./Graph.js"

class MetrixMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: null,
            statOptions: null,
            graphType: null,
            playerData: null
        }
    }
    
    playerDataCallback = (data) => {
        console.log(this.state.playerData);
        this.setState({playerData: data});
        console.log(this.state.playerData);
    }
    
    statOptionsCallback = (data) => {
        this.setState({statOptions: data});
    }
    
    graphOptionsCallback = (type) => {
        this.setState({graphType: type});
    }

    render() {
        return (
            <div  id="metrixMaker">
                <CreateNewReport />
                <div id="metrixLeft">
                    <div id="statTitle"><span>Choose Two Stats to Create a New Metric</span></div>
                    <div id="divider"><span>VIEWS</span></div>
                    <StatOptions statOptionsCallback={this.statOptionsCallback} graphType={this.state.graphType} />
                    <div id="divider"><span>VIEWS</span></div>
                    <GraphOptions graphOptionsCallback={this.graphOptionsCallback}/>
                    <div id="divider"><span>FILTERS</span></div>
                    <Filters />
                </div>
                <div id="metrixRight">
                    <StatsTable playerDataCallback={this.playerDataCallback}/>
                    <Graph graphType={this.state.graphType} playerData={this.state.playerData} statOptions={this.state.statOptions}/>
                </div>
            </div>
        )
    }
}

export default MetrixMaker