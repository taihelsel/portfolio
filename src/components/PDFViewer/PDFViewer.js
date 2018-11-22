import React, { Component } from 'react';
import './PDFViewer.css';

class PDFViewer extends Component {
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
        document.getElementById("pdf-viewer" + this.props.pdfViewerKey).classList.add("selected-explorer");
    }
    handleMouseUp = (e) => {
        this.firstMoveOffset = null;
        document.removeEventListener('mousemove', this.moveExplorer);
    }
    handleMouseDown = (e) => {
        document.addEventListener('mousemove', this.moveExplorer);
    }
    moveExplorer = (e) => {
        let explorerEl = document.getElementById("pdf-viewer" + this.props.pdfViewerKey);
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
        this.props.handleClose(e, this.props.pdfViewerKey);
    }
    render() {
        return (
            <div id={"pdf-viewer" + this.props.pdfViewerKey} className="pdf-viewer explorer" onMouseDown={this.setAsActiveExplorer} >
                <div className="pdf-viewer-head explorer-head" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                    <h3 className="explorer-title">{this.props.name}</h3>
                    <ul className="explorer-controls">
                        <li onClick={this.handleExplorerMin}>-</li>
                        <li onClick={this.handleExplorerMax}>+</li>
                        <li onClick={this.handleExplorerClose}>x</li>
                    </ul>
                </div>
                <div className="pdf-viewer-body">
                    <embed className="pdf-viewer-content" src={this.props.data} />
                </div>
            </div>
        );
    }
}

export default PDFViewer;
