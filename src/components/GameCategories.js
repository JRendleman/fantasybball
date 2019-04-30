import React from "react";
import Category from "./Category.js";
import "../css/GameCategories.css";

export default class GameCategories extends React.Component {

    render() {
        return  (
            <div id="category-wrapper">
                <div id="team-names">
                    <div id="user-team">
                        <h2>You</h2>
                        <h2>{this.props.userScore}</h2>
                    </div>
                    <div id="cpu-team">
                        <h2>{this.props.cpuScore}</h2>
                        <h2>{this.props.cpuName}</h2>
                    </div>
                </div>
                <div id="categories">
                    <Category
                    categoryName="PTS" 
                    totalLeft={this.props.userCats.ppg}
                    totalRight={this.props.cpuCats.ppg}
                    />
                    <Category
                    categoryName="REB" 
                    totalLeft={this.props.userCats.reb}
                    totalRight={this.props.cpuCats.reb}
                    />
                    <Category
                    categoryName="AST" 
                    totalLeft={this.props.userCats.ast}
                    totalRight={this.props.cpuCats.ast}
                    />
                    <Category
                    categoryName="STL" 
                    totalLeft={this.props.userCats.stl}
                    totalRight={this.props.cpuCats.stl}
                    />
                    <Category
                    categoryName="BLK" 
                    totalLeft={this.props.userCats.blk}
                    totalRight={this.props.cpuCats.blk}
                    />
                    <Category
                    categoryName="FG%" 
                    totalLeft={this.props.userCats.fg}
                    totalRight={this.props.cpuCats.fg}
                    />
                    <Category
                    categoryName="3PT%" 
                    totalLeft={this.props.userCats.tpt}
                    totalRight={this.props.cpuCats.tpt}
                    />
                    <Category
                    categoryName="FT%" 
                    totalLeft={this.props.userCats.ft}
                    totalRight={this.props.cpuCats.ft}
                    />
                    <Category
                    categoryName="TO" 
                    totalLeft={this.props.userCats.to}
                    totalRight={this.props.cpuCats.to}
                    />
                </div>
            </div>
        )
    }

}