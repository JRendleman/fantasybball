import React from "react"
import Plot from 'react-plotly.js'

function parseStats(currentStat, playerData) {
    switch (currentStat) {
        case "Points":
            return playerData.map(player => player.ppg);
        case "Rebounds":
            return playerData.map(player => player.reb);
        case "Assists":
            return playerData.map(player => player.ast);
        case "Steals":
            return playerData.map(player => player.stl);
        case "Blocks":
            return playerData.map(player => player.blk);
        case "3-PT%":
            return playerData.map(player => player.tpt);
        case "FT%":
            return playerData.map(player => player.ft);
        case "FG%":
            return playerData.map(player => player.fg);
        case "Turnovers":
            return playerData.map(player => player.to);
        default:
            return playerData.map(player => player.name);
    }
}

function getData(props) {
    switch(props.graphType) {
            case "barStyle":
                    return [
                        {
                        type: 'bar',
                        x: props.playerData.map(player => player.name),
                        y: parseStats(props.statOptions[0], props.playerData)
                        }
                    ]

            case "lineStyle":
                    let traces = [];
                    let colors = ['red', 'blue', 'purple', 'orange', 'black', 'teal']
                    for (let i = 0; i < props.statOptions.length; i++) {
                        traces.push({
                            x: props.playerData.map(player => player.name),
                            y: parseStats(props.statOptions[i], props.playerData),
                            type: 'scatter',
                            mode: 'lines',
                            name: props.statOptions[i],
                            marker: {color: colors[i % 6]},
                        });
                    }
                    
                    return traces
            case "scatterStyle":
                    return [
                        {
                        x: parseStats(props.statOptions[0], props.playerData),
                        y: parseStats(props.statOptions[1], props.playerData),
                        text: props.playerData.map(player => player.name),
                        type: 'scatter',
                        mode: 'markers',
                        textposition: "top",
                        marker: {color: 'red'},
                        }
                    ]
            default:
                return null
        }
}

function getAxisNames(props) {
    let names = [];
    
    if (props.statOptions.length == 0) {
        return names
    }
    
    if (props.statOptions.length < 2) {
        names.push(props.statOptions[0]);
        names.push("Player");
    } else {
        names.push(props.statOptions[0]);
        names.push(props.statOptions[1]);
    }
    
    return names;
}


class Graph extends React.Component {
    constructor(props) {
        super(props);
        
        this.graphType = props.graphType;
        this.data = props.data;
    }
    
    
    render() {
        if (this.props.statOptions == null || this.props.graphType == null || this.props.playerData == null) {
            return (<div></div>)
        }
                   
        let data = getData(this.props);
        let axesNames = getAxisNames(this.props);
        if (axesNames.length == 0) {
            axesNames.push("");
            axesNames.push("")
        }
        
        let x = axesNames[0];
        let y = axesNames[1];
        console.log(x);
        console.log(y);
            
        return(
            <div id="graphDiv">
            <Plot className="graph"
                data={data}
                layout={ {
                    paper_bgcolor: "#F5F6F7",
                    plot_bgcolor: "#F5F6F7",
                    scene: {
                        xaxis: {
                            name: {x}
                        },
                        yaxis: {
                            name: {y}
                        }
                    } }
                }
            />
            </div>
        )

            
    
    }
}


export default Graph