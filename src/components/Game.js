import React from "react"

export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lineup: [],
            opposingTeamInfo: this.props.opposingTeamInfo,
            opposingTeam: this.props.opposingTeam,
            userTeam: this.props.userTeam
        }
    }

    render() {
        return(
            <div id="game">
                
            </div>
        )
    }
}