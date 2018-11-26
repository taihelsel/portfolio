import React, { Component } from 'react';
import './FileViewer.css';
//generic handlers
import {moveWindow} from "../../handlers/windowHandlers";
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
        try {document.getElementsByClassName("selected-explorer")[0].classList.remove("selected-explorer");} catch{ }
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
    renderBody = () => {
        switch(this.props.type){
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
                    <h3 className="explorer-title">{this.props.name+"."+this.props.type}</h3>
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
