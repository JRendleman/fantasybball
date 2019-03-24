import React from "react"
import Plot from 'react-plotly.js'

class Graph extends React.Component {
    constructor(props) {
        super();
        this.graphType = props.graphType;
        this.data = props.data;
    }
    
    render() {

        return(
            <Plot 
                data={[
                    {
                    x: [1, 2, 4],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'red'},
                    },
                    {
                    type: 'bar',
                    x: [1, 2, 3],
                    y: [2, 5, 3]
                    },
                ]}
            />
        )
        }
}

export default Graph