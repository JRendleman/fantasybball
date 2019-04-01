import React from "react"


class Filters extends React.Component {    
    render() {
        return(
        <div id="filters">
            <input className="filterButtons" type="button" value="Cleveland Cavaliers"/>
            <input className="filterButtons" type="button" value="Small Forwards"/>
            <input className="filterButtons" type="button" value=">20 Games Played"/>

        </div>    
    )
    }
}

export default Filters

//            <input id="addFilter" type="button" value="Add Filter"/>