import React from "react"
import scatter from "../images/scatter.png"
import pie from "../images/pie.png"
import bar from "../images/bar.png"
import line from "../images/line.png"

export default class GraphOptions extends React.Component {
    constructor(props) {
        super(props);
        
        this.graphStyle = "scatterStyle";
        
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            graphTitle: "Scatter Plot",
            graphDescription: "Two variables are plotted along two axes, the pattern of the resulting points reveal any correlations and outliers present."
        }
    }
    
    handleClick(e) {
        e.persist();
        let value = e.target.value;
        this.graphStyle = value;
        switch(this.graphStyle) {
            case "pieStyle":
                this.setState({ graphTitle: "Pie Chart",
                                graphDescription: "A chart that uses \"pie slices\" to show relative sizes of data. The chart is divided into sectors, where each sector shows the relative size of each value."});
                break;
            case "barStyle":
                this.setState({ graphTitle: "Bar Chart",
                                graphDescription: "A chart which shows the values of different categories of data as rectangular bars with different lengths."});
                break;
            case "lineStyle":
                this.setState({ graphTitle: "Line Graph",
                                graphDescription: "A chart which displays information as a series of data points called 'markers' connected by straight line segments."});
                break;
            default:
                this.setState({ graphTitle: "Scatter Plot",
                                graphDescription: "Two variables are plotted along two axes, the pattern of the resulting points reveal any correlations and outliers present."});
                break;
        }
        this.props.graphOptionsCallback(this.graphStyle);
        this.forceUpdate();
        
    }
    
    render() {
        return (
            <div id="graphOptions">
            <div id="graphs">
                <input type="image" src= {scatter} alt = "button" value ="scatterStyle" onClick={this.handleClick.bind(this)} />
                <input type="image" src= {pie} alt = "button" value ="pieStyle" onClick={this.handleClick.bind(this)} />
                <input type="image" src= {bar} alt = "button" value ="barStyle" onClick={this.handleClick.bind(this)} />
                <input type="image" src= {line} alt = "button" value ="lineStyle" onClick={this.handleClick.bind(this)} />
            </div>
            <div id="graphDescription">
            <h2>{this.state.graphTitle}</h2>
            <p>{this.state.graphDescription}</p>
            </div>
        </div>
        )
    } 
}