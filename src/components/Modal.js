import React from "react"

export default class Modal extends React.Component {
    render() {
        return (
            <div id="modal-wrapper"style={{
                transform: this.props.isShowing ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: this.props.isShowing ? '1' : '0'
            }}>
                <div id="modal-header">
                    <h3>{this.props.header}</h3>
                </div>
                <div id="modal-body">
                    <span>
                        {this.props.body}
                    </span>
                </div>
                <div id="modal-footer">
                    <input type="button" value="OK" onClick={this.props.close}/>
                </div>
            </div>
        )
    }
}