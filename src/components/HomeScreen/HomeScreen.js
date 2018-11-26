import React, { Component } from 'react';
import BackgroundImage from "../../media/background2.jpg";
import './HomeScreen.css';
//Static Data
import { HomeData } from "../../data/HomeData.js";
//Generic Functions
import { handleWindowClose, handleWindowOpen } from "../../handlers/windowHandlers.js";
import {drawBox} from "../../handlers/drawBoxHandler.js";
//ReactComponents
import MediumIcon from "../MediumIcon/MediumIcon.js";
import Explorer from "../Explorer/Explorer.js";
import TextViewer from "../TextViewer/TextViewer.js";
import ImageViewer from "../ImageViewer/ImageVIewer.js";
import PDFViewer from "../PDFViewer/PDFViewer.js";
import PopupModal from "../PopupModal/PopupModal.js";
class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            explorerWindows: {},
            textViewerWindows: {},
            fileOptionWindows: {},
            PDFViewerWindows: {},
            imageViewerWindows: {},
            homeFolders: HomeData,
        }
        this.firstPos = {x: 0,y: 0}
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
            } catch{ };
        }
    }
    onMouseDown = (e) => {
        if (e.which === 1 && e.target.id === "HomeScreen") {
            this.firstPos = {
                x: e.pageX,
                y: e.pageY
            }
            document.addEventListener('mousemove', this.handleDrawBox);
        }
    }
    handleDrawBox = (e) => drawBox(e,"HomeScreen",this.firstPos);
    //handle new windows
    handleFolderClick = (e, name, data) => this.setState({explorerWindows: handleWindowOpen(e, name, data, { ...this.state.explorerWindows }, <Explorer />, { handleFileOption: this.handleFileOption, handleTextDocClick: this.handleTextDocClick, handleImageFileClick: this.handleImageFileClick, closeAllExplorers: this.closeAllExplorers, handleClose: this.handleExplorerClose })});
    handleTextDocClick = (e, name, data) => this.setState({textViewerWindows: handleWindowOpen(e, name, data, { ...this.state.textViewerWindows }, <TextViewer />, { handleClose: this.handleTextViewerClose })});
    handleImageFileClick = (e, name, data) => this.setState({ imageViewerWindows: handleWindowOpen(e, name, data, { ...this.state.imageViewerWindows }, <ImageViewer />, { handleClose: this.handleImageViewerClose }) });
    handlePDFDocClick = (e, name, data) => this.setState({ PDFViewerWindows: handleWindowOpen(e, name, data, { ...this.state.PDFViewerWindows }, <PDFViewer />, { handleClose: this.handlePDFViewerClose })});
    handleFileOption = (e, name, data, question, options) => this.setState({ fileOptionWindows: handleWindowOpen(e, name, data, { ...this.state.fileOptionWindows }, <PopupModal />, { handlePDFDocClick: this.handlePDFDocClick, handleTextDocClick: this.handleTextDocClick, handleClose: this.handleFileOptionClose, options: options, question: question })});
    //handle closing old windows
    handleExplorerClose = (e, key) => this.setState({explorerWindows: handleWindowClose(e, key, { ...this.state.explorerWindows })});
    handleTextViewerClose = (e, key) => this.setState({textViewerWindows: handleWindowClose(e, key, { ...this.state.textViewerWindows })});
    handleImageViewerClose = (e, key) => this.setState({imageViewerWindows: handleWindowClose(e, key, { ...this.state.imageViewerWindows })});
    handlePDFViewerClose = (e, key) =>  this.setState({PDFViewerWindows: handleWindowClose(e, key, { ...this.state.PDFViewerWindows })});
    handleFileOptionClose = (e, key) => this.setState({ fileOptionWindows: handleWindowClose(e, key, { ...this.state.fileOptionWindows })});
    closeAllExplorers = () => this.setState({ explorerWindows: {} });

    renderAllWindows = () => {
        return (
            <div>
                {Object.values(this.state.explorerWindows).map( item => item)}
                {Object.values(this.state.textViewerWindows).map( item => item)}
                {Object.values(this.state.imageViewerWindows).map( item => item)}
                {Object.values(this.state.PDFViewerWindows).map( item => item)}
                {Object.values(this.state.fileOptionWindows).map( item => item)}
            </div>
        );
    }
    render() {
        return (
            <div id="HomeScreen" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="shortcut-wrapper">
                    {this.state.homeFolders.map((x) => {
                        return <MediumIcon handleFileOption={this.handleFileOption} handleTextDocClick={this.handleTextDocClick} handleImageFileClick={this.handleImageFileClick} handleFolderClick={this.handleFolderClick} data={x} />
                    })}
                </div>
                {this.renderAllWindows()}
            </div>
        );
    }
}

export default HomeScreen;
