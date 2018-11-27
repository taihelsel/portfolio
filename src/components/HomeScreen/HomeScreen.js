import React, { Component } from 'react';
import BackgroundImage from "../../media/background2.jpg";
import './HomeScreen.css';
//Static Data
import { HomeData } from "../../data/HomeData.js";
//Generic Functions
import { handleWindowClose, handleWindowOpen } from "../../handlers/windowHandlers.js";
import { drawBox } from "../../handlers/drawBoxHandler.js";
//ReactComponents
import MediumIcon from "../MediumIcon/MediumIcon.js";
import Explorer from "../Explorer/Explorer.js";
import FileViewer from "../FileViewer/FileViewer.js";
import PopupModal from "../PopupModal/PopupModal.js";
class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            explorerWindows: {},
            popupModalWindows: {},
            fileViewerWindows: {},
            homeFolders: HomeData,
        }
        this.firstPos = { x: 0, y: 0 }
        this.iconLocations = []
    }
    componentDidMount() {
        //adding listeners for the green box when you drag mouse
        document.getElementById("HomeScreen").addEventListener("mouseup", this.onMouseUp);
        document.getElementById("HomeScreen").addEventListener("mousedown", this.onMouseDown);
    }
    //handle draw box
    onMouseUp = (e) => {
        if (e.which === 1) {
            try { //cause JavaScript...
                document.removeEventListener('mousemove', this.handleDrawBox);
                document.getElementById("selectBox").classList.add("hideBox");
                if (this.firstPos.x !== e.pageX && this.firstPos.y !== e.pageY){
                    document.getElementById("selectBox").classList.add("recently-selected");
                }
                this.iconLocations = [];
            } catch{ };
        }
    }
    onMouseDown = (e) => {
        if (e.which === 1 && e.target.id === "HomeScreen") {
            this.firstPos = {
                x: e.pageX,
                y: e.pageY
            }
            let icons = document.getElementById("HomeScreen").getElementsByClassName("medium-icon");
            for (let i = 0; i < icons.length; i++) {
                let rect = icons[i].getBoundingClientRect();
                this.iconLocations.push({
                    top: rect.top,
                    left: rect.left,
                    bottom: rect.bottom,
                    right: rect.right,
                    index: i,
                });
            }
            document.addEventListener('mousemove', this.handleDrawBox);
        }
    }
    handleDrawBox = (e) => drawBox(e, "HomeScreen", this.firstPos, this.iconLocations);
    //handle new windows
    handleExplorerOpen = (e, name, data) => this.setState({ explorerWindows: handleWindowOpen(e, name, data, { ...this.state.explorerWindows }, <Explorer />, { handlePopupModal: this.handlePopupModal, handleFileViewerOpen: this.handleFileViewerOpen, handleExplorerOpen: this.handleExplorerOpen, closeAllExplorers: this.closeAllExplorers, handleClose: this.handleExplorerClose }) });
    handleFileViewerOpen = (e, name, data, type) => this.setState({ fileViewerWindows: handleWindowOpen(e, name, data, { ...this.state.fileViewerWindows }, <FileViewer />, { handleClose: this.handleFileViewerClose, type: type }) });
    handlePopupModal = (e, name, data, question, options) => this.setState({ popupModalWindows: handleWindowOpen(e, name, data, { ...this.state.popupModalWindows }, <PopupModal />, { handleFileViewerOpen: this.handleFileViewerOpen, handleTextDocClick: this.handleTextDocClick, handleClose: this.handlePopupModalClose, options: options, question: question }) });
    //handle closing old windows
    handleExplorerClose = (e, key) => this.setState({ explorerWindows: handleWindowClose(e, key, { ...this.state.explorerWindows }) });
    handleFileViewerClose = (e, key) => this.setState({ fileViewerWindows: handleWindowClose(e, key, { ...this.state.fileViewerWindows }) });
    handlePopupModalClose = (e, key) => this.setState({ popupModalWindows: handleWindowClose(e, key, { ...this.state.popupModalWindows }) });
    closeAllExplorers = () => this.setState({ explorerWindows: {} });

    unselectAllItems = () => {
        let parentEl = document.getElementById("HomeScreen");
        let x = parentEl.getElementsByClassName("medium-icon");
        for (let i = 0; i < x.length; i++) {
            if (x[i].classList.contains("selected-icon")) {
                x[i].classList.remove("selected-icon");
            }
        }
    }
    renderAllWindows = () => {
        return (
            <div>
                {Object.values(this.state.explorerWindows).map(item => item)}
                {Object.values(this.state.fileViewerWindows).map(item => item)}
                {Object.values(this.state.popupModalWindows).map(item => item)}
            </div>
        );
    }
    handleHomeScreenClick = (e) => {
        let selectBox = document.getElementById("selectBox");
        if (selectBox !== null && selectBox.classList.contains("recently-selected")) {
            console.log("recently selected");
            selectBox.classList.remove("recently-selected");
        } else if (e.target.id === "HomeScreen") this.unselectAllItems();

    }
    render() {
        return (
            <div id="HomeScreen" style={{ backgroundImage: `url(${BackgroundImage})` }} onClick={this.handleHomeScreenClick}>
                <div className="shortcut-wrapper">
                    {this.state.homeFolders.map((x, i) => {
                        return <MediumIcon key={"homescreen-icon" + i} unselectAllIcons={this.unselectAllItems} handlePopupModal={this.handlePopupModal} handleFileViewerOpen={this.handleFileViewerOpen} handleFolderClick={this.handleExplorerOpen} data={x} />
                    })}
                </div>
                {this.renderAllWindows()}
            </div>
        );
    }
}

export default HomeScreen;
