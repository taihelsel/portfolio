import React, { Component } from 'react';
import './PopupModal.css';
//generic handlers
import {moveWindow} from "../../handlers/windowHandlers";
class PopupModal extends Component {
    constructor() {
        super();
        this.state = {};
        this.firstMoveOffset = null;
    }
    componentDidMount() {
        this.setAsActiveExplorer();
    }
    setAsActiveExplorer = () => {
        try {
            document.getElementsByClassName("selected-explorer")[0].classList.remove("selected-explorer");
        } catch{ }
        document.getElementById(this.props.uniqueKey).classList.add("selected-explorer");
    }
    handleMouseUp = (e) => {
        this.firstMoveOffset = null;
        document.removeEventListener('mousemove', this.moveExplorer);
    }
    handleMouseDown = (e) => {
        document.addEventListener('mousemove', this.moveExplorer);
    }
    moveExplorer = (e) => {
        let x = moveWindow(e,this.props.uniqueKey,this.firstMoveOffset);
        if(x !== null) this.firstMoveOffset = x;
    }
    handleExplorerClose = (e) => {
        this.props.handleClose(e, this.props.uniqueKey);
    }
    handleOptionClick = (e) => {
        let choice = e.currentTarget.innerText.toLowerCase();
        this.props.handleFileViewerOpen(e, this.props.name, this.props.data[choice],choice);
        this.handleExplorerClose(null);

    }
    render() {
        return (
            <div id={this.props.uniqueKey} className="popup-modal explorer" onMouseDown={this.setAsActiveExplorer} >
                <div className="popup-modal-head explorer-head" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                    <h3 className="explorer-title">{this.props.name}</h3>
                    <ul className="explorer-controls">
                        <li onClick={this.handleExplorerClose}>x</li>
                    </ul>
                </div>
                <div className="popup-modal-body">
                    <h1 className="popup-modal-question">{this.props.question}</h1>
                    <ul className="popup-modal-options">
                        {this.props.options.map(i => <li onClick={this.handleOptionClick}>{i}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default PopupModal;
