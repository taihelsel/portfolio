import React, { Component } from 'react';
import './FileViewer.css';
//generic handlers
import { moveWindow } from "../../handlers/windowHandlers";
class FileViewer extends Component {
    constructor() {
        super();
        this.state = {};
        this.firstMoveOffset = null;
    }
    componentDidMount() {
        this.setAsActiveExplorer();
    }
    setAsActiveExplorer = () => {
        try { document.getElementsByClassName("selected-explorer")[0].classList.remove("selected-explorer"); } catch{ }
        document.getElementById(this.props.uniqueKey).classList.add("selected-explorer");
        let footerTab = document.getElementById("footer-tab-"+this.props.uniqueKey);
        if(footerTab !== null){
          try { document.getElementsByClassName("selected-footer-window")[0].classList.remove("selected-footer-window"); } catch{ }
          footerTab.classList.add("selected-footer-window");
        }
    }
    handleMouseUp = (e) => {
        let el = document.getElementById(this.props.uniqueKey);
        if (el.classList.contains("explorer-fullscreen") === false) {
            this.firstMoveOffset = null;
            document.removeEventListener('mousemove', this.moveExplorer);
        }
    }
    handleMouseDown = (e) => {
        let el = document.getElementById(this.props.uniqueKey);
        if (el.classList.contains("explorer-fullscreen") === false) document.addEventListener('mousemove', this.moveExplorer);
    }
    moveExplorer = (e) => {
        let x = moveWindow(e, this.props.uniqueKey, this.firstMoveOffset);
        if (x !== null) this.firstMoveOffset = x;
    }
    handleExplorerMin = () => {
        let el = document.getElementById(this.props.uniqueKey);
        if(el.classList.contains("explorer-minimize")) el.classList.remove("explorer-minimize");
        else  el.classList.add("explorer-minimize");
      }
    handleExplorerMax = () => {
        let el = document.getElementById(this.props.uniqueKey);
        if(el.classList.contains("explorer-fullscreen")) el.classList.remove("explorer-fullscreen");
        else  el.classList.add("explorer-fullscreen");
      }
    handleExplorerClose = (e) => {
        this.props.handleClose(e, this.props.uniqueKey);
    }
    renderBody = () => {
        switch (this.props.type) {
            case "txt":
                return <pre className="text-viewer-content">{this.props.data}</pre>
            case "pdf":
                return <embed className="pdf-viewer-content" src={this.props.data} />
            case "img":
                return <img className="image-viewer-content" src={require(`../.././media/previews/${this.props.data}`)} />
        }
    }
    render() {
        return (
            <div id={this.props.uniqueKey} className="file-viewer explorer" onMouseDown={this.setAsActiveExplorer} >
                <div className="file-viewer-head explorer-head" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                    <h3 className="explorer-title">{this.props.name + "." + this.props.type}</h3>
                    <ul className="explorer-controls">
                        <li onClick={this.handleExplorerMin}>-</li>
                        <li onClick={this.handleExplorerMax}>+</li>
                        <li onClick={this.handleExplorerClose}>x</li>
                    </ul>
                </div>
                <div className="file-viewer-body" >
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}

export default FileViewer;
