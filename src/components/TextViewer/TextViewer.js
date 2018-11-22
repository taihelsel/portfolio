import React, { Component } from 'react';
import './TextViewer.css';

class TextViewer extends Component {
    constructor(){
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
        document.getElementById("text-viewer" + this.props.textViewerKey).classList.add("selected-explorer");
    }
    handleMouseUp = (e) => {
        this.firstMoveOffset = null;
        document.removeEventListener('mousemove', this.moveExplorer);
    }
    handleMouseDown = (e) => {
        document.addEventListener('mousemove', this.moveExplorer);
    }
    moveExplorer = (e) => {
        let explorerEl = document.getElementById("text-viewer" + this.props.textViewerKey);
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
        this.props.handleClose(e, this.props.textViewerKey);
    }
    render() {
        return (
            <div id={"text-viewer" + this.props.textViewerKey} className="text-viewer explorer" onMouseDown={this.setAsActiveExplorer} >
                <div className="text-viewer-head explorer-head">
                    <h3 className="explorer-title" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>{this.props.name}</h3>
                    <ul className="explorer-controls">
                        <li onClick={this.handleExplorerMin}>-</li>
                        <li onClick={this.handleExplorerMax}>+</li>
                        <li onClick={this.handleExplorerClose}>x</li>
                    </ul>
                </div>
                <div className="text-viewer-body">
                    <p className="text-viewer-content">{this.props.data}</p>
                </div>
            </div>
        );
    }
}

export default TextViewer;
