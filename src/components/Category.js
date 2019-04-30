import React from "react";
import "../css/Category.css"

export default class Category extends React.Component {

    getColor(isUser) {
        if (this.props.categoryName === "TO") {
            if (isUser) {
                return this.props.totalLeft > this.props.totalRight ? "gray" : "#24569D"
            } else {
                return this.props.totalRight > this.props.totalLeft ? "gray" : "#24569D"
            }
        } else {
            if (isUser) {
                return this.props.totalLeft < this.props.totalRight ? "gray" : "#24569D"
            } else {
                return this.props.totalRight < this.props.totalLeft ? "gray" : "#24569D"
            }
        }
    }

    render() {
        let multiplier = this.props.categoryName === "PTS" ? 4 : 2
        return(

            <div className="category">
                <div className="cat-bar-left" 
                    style={{
                        width : String(this.props.totalLeft/multiplier) + "px", 
                        backgroundcolor : this.getColor(true)
                }}>
                </div>
                <div className="cat-total-left">
                    <span style={{color : this.getColor(true)}}>
                        {this.props.totalLeft}
                    </span>
                </div>
                <div className="cat-label">
                    <span>
                        {this.props.categoryName}
                    </span>
                </div>
               <div className="cat-total-right">
                    <span  
                        style={{color : this.getColor(false)}}>
                        {this.props.totalRight}
                    </span>
               </div>
                
                <div className="cat-bar-right" 
                    style={{width : String(this.props.totalRight/multiplier) + "px", backgroundcolor : this.getColor(false)}}></div>
            </div>
        )
    }
}