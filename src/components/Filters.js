import React from "react"

function Filters() {
    return(
        <div id="filters">
            <input className="filterButtons" type="button" value="Cleveland Cavaliers"/>
            <input className="filterButtons" type="button" value="Small Forwards"/>
            <input className="filterButtons" type="button" value=">20 Games Played"/>
            <input id="addFilter" type="button" value="Add Filter"/>
        </div>
        
            
    )
}

export default Filters