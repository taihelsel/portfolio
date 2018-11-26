import React, { Component } from 'react';
import './PopupModal.css';

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
        document.getElementById("popup-modal" + this.props.uniqueKey).classList.add("selected-explorer");
    }
    handleMouseUp = (e) => {
        this.firstMoveOffset = null;
        document.removeEventListener('mousemove', this.moveExplorer);
    }
    handleMouseDown = (e) => {
        document.addEventListener('mousemove', this.moveExplorer);
    }
    moveExplorer = (e) => {
        let explorerEl = document.getElementById("popup-modal" + this.props.uniqueKey);
        let explorerElStyle = getComputedStyle(explorerEl);
        let currentStyle = {
            x: parseFloat(explorerElStyle.getPropertyValue("left")),
            y: parseFloat(explorerElStyle.getPropertyValue("top")),
            width: parseFloat(explorerElStyle.getPropertyValue("width")),
            height: parseFloat(explorerElStyle.getPropertyValue("height")),
        }
        if (this.firstMoveOffset === null) this.firstMoveOffset = e.pageX - currentStyle.x;
        let newX = e.pageX - this.firstMoveOffset;
        let newY = e.pageY;
        if (newX > 0 && currentStyle.width + newX < window.innerWidth) {
            explorerEl.style.left = newX + "px";
        }
        if (newY > 0 && currentStyle.height + newY < window.innerHeight) {
            explorerEl.style.top = newY + "px";
        }
    }
    handleExplorerClose = (e) => {
        this.props.handleClose(e, this.props.uniqueKey);
    }
    handleOptionClick = (e) => {
        let choice = e.currentTarget.innerText.toLowerCase();
        switch (choice) {
            case "pdf":
                this.props.handlePDFDocClick(e, this.props.name, this.props.data[choice]);
                break;
            case "text":
                this.props.handleTextDocClick(e, this.props.name, this.props.data[choice]);
                break;
        }
        this.handleExplorerClose(null);

    }
    render() {
        return (
            <div id={"popup-modal" + this.props.uniqueKey} className="popup-modal explorer" onMouseDown={this.setAsActiveExplorer} >
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
