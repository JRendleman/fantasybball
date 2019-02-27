import React from "react"
import CreateNewReport from "./CreateNewReport.js"
import StatOptions from "./StatOptions.js"
import GraphOptions from "./GraphOptions.js"
import Filters from "./Filters.js"
import StatsTable from "./StatsTable.js"
import graph from "../images/graphPlaceholder.png"

function MetrixMaker() {
    return (
        <div  id="metrixMaker">
            <CreateNewReport />
            <div id="metrixLeft">
                <div id="statTitle"><span>Player Value by Rebounds</span></div>
                <div id="divider"><span>VIEWS</span></div>
                <StatOptions />
                <div id="divider"><span>VIEWS</span></div>
                <GraphOptions />
                <div id="divider"><span>FILTERS</span></div>
                <Filters />
            </div>
            <div id="metrixRight">
                <StatsTable />
                <img id="graphPlaceholder" src={graph} />
            </div>
        </div>
    )
}

export default MetrixMaker