import React from "react"
import Header from "./Header.js"
import Draft from "./Draft.js";
import MetrixMaker from "./MetrixMaker.js"


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: "Metric Maker"
        }
    }
    // Callback to Header.js to keep track of what page we're on.
    headerCallback = (data) => {
        this.setState({currentPage: data});
    }

    render() {
        switch(this.state.currentPage) {
            case "Home":
                return(
                    <div>
                        <Header callback={this.headerCallback}/>
                        <Draft />
                    </div>
                )
            case "Metric Maker":
                return (
                    <div>
                        <Header callback={this.headerCallback}/>
                        <MetrixMaker />
                    </div>
                )
            case "My Team":
                    return(
                        <div>
                            <Header callback={this.headerCallback}/>
                        </div>
                    )
            case "Draft":
                    return (
                        <div>
                            <Draft />
                        </div>
                    )
            default:
                return (
                    <div>

                    </div> 
                )
        }
    }
}

export default App