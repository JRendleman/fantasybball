import React from "react"
import "../css/Header.css"


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "Metric Maker"
        }

        this.navButtonClicked = this.navButtonClicked.bind(this);
    }

    navButtonClicked(e) {
        e.persist();
        let val = e.target.value;

        if (this.state.currentPage !== val) {
            this.setState({currentPage: val})
            this.props.callback(val)
        }
    }

    render() {
        

        return (
            <div id="headerBar">
                <h2>{this.state.currentPage}</h2>
                <div id="navBar">
                    
                    <input type="button" value="My Team" onClick={this.navButtonClicked}/>
                    <input type="button" value="Schedule" onClick={this.navButtonClicked}/>
                    <input type="button" value="Metric Maker" onClick={this.navButtonClicked}/>
                </div>
            </div>
        )
    }
}