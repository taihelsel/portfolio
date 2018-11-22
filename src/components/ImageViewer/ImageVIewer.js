import React, { Component } from 'react';
import './ImageViewer.css';

class ImageViewer extends Component {
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
        document.getElementById("image-viewer" + this.props.imageViewerKey).classList.add("selected-explorer");
    }
    handleMouseUp = (e) => {
        this.firstMoveOffset = null;
        document.removeEventListener('mousemove', this.moveExplorer);
    }
    handleMouseDown = (e) => {
        document.addEventListener('mousemove', this.moveExplorer);
    }
    moveExplorer = (e) => {
        let explorerEl = document.getElementById("image-viewer" + this.props.imageViewerKey);
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
        this.props.handleClose(e, this.props.imageViewerKey);
    }
    render() {
        return (
            <div id={"image-viewer" + this.props.imageViewerKey} className="image-viewer explorer" onMouseDown={this.setAsActiveExplorer} >
                <div className="image-viewer-head explorer-head" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                    <h3 className="explorer-title">{this.props.name}</h3>
                    <ul className="explorer-controls">
                        <li onClick={this.handleExplorerMin}>-</li>
                        <li onClick={this.handleExplorerMax}>+</li>
                        <li onClick={this.handleExplorerClose}>x</li>
                    </ul>
                </div>
                <div className="image-viewer-body">
                    <img className="image-viewer-content" src={require(`../.././media/previews/${this.props.data}`)} />
                </div>
            </div>
        );
    }
}

export default ImageViewer;
