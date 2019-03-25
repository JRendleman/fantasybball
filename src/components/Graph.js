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

function parseArray() {
    
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
        
        switch(this.props.graphType) {
            case "pieStyle":
                return(
                    <Plot 
                        data={[
                            {
                            type: 'pie',
                            values: [19, 26, 55],
                            labels: ['Residential', 'Non-Residential', 'Utility']
                            }
                        ]}
                    />
                )

            case "barStyle":
                return(
                    <Plot 
                        data={[
                            {
                            type: 'bar',
                            x: this.props.playerData.map(player => player.name),
                            y: parseStats(this.props.statOptions[0], this.props.playerData)
                            }
                        ]}
                    />
                )
            case "lineStyle":
                return(
                    <Plot 
                        data={[
                            {
                            x: parseStats(this.props.statOptions[0], this.props.playerData),
                            y: parseStats(this.props.statOptions[1], this.props.playerData),
                            type: 'scatter',
                            mode: 'lines',
                            marker: {color: 'red'},
                            }
                        ]}
                    />
                )
            case "scatterStyle":
                return(
                    <Plot 
                        data={[
                            {
                            x: parseStats(this.props.statOptions[0], this.props.playerData),
                            y: parseStats(this.props.statOptions[1], this.props.playerData),
                            text: this.props.playerData.map(player => player.name),
                            type: 'scatter',
                            mode: 'markers+text',
                            textposition: "top",
                            marker: {color: 'red'},
                            }
                        ]}
                    />
                )
            default:
                return (<div></div>)
        }
    
    }
}

export default Graph