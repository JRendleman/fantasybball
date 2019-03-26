import React from "react"
import Plot from 'react-plotly.js'

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.graphType = props.graphType;
        this.data = props.data;
    }
    
    render() {
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
                            x: [1, 2, 3],
                            y: [2, 5, 3]
                            }
                        ]}
                    />
                )
            case "lineStyle":
                return(
                    <Plot 
                        data={[
                            {
                            x: [1, 2, 4],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: {color: 'red'},
                            }
                        ]}
                    />
                )
            default:
                return(
                    <Plot 
                        data={[
                            {
                            x: [1, 2, 4],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'red'},
                            }
                        ]}
                    />
                )
        }
    
    }
}

export default Graph