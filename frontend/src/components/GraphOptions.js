import React from "react"
import scatter from "../images/scatter.png"
import pie from "../images/pie.png"
import bar from "../images/bar.png"
import line from "../images/line.png"

function GraphOptions() {
    return (
        <div id="graphOptions">
            <div id="graphs">
                <img src={line} />
                <img src={bar} />
                <img src={scatter} />
                <img src={pie} />
            </div>
            <div id="graphDescription">
            <h2>Scatter Plot</h2>
            <p>Two variables are plotted along two axes, the pattern of the resulting points reveal any correlations and outliers present.</p>
            </div>
        </div>
    )
    
}

export default GraphOptions 