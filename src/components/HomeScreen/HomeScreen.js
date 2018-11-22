import React, { Component } from 'react';
import BackgroundImage from "../../media/background2.jpg";
import './HomeScreen.css';

import MediumIcon from "../MediumIcon/MediumIcon.js";
import Explorer from "../Explorer/Explorer.js";
import TextViewer from "../TextViewer/TextViewer.js";
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
            homeFolders: [
                {
                    name: "Projects",
                    content: [
                        {
                            name: "Project1",
                            content: [
                                {
                                    name: "html file",
                                    type: "html",
                                    content: "testfilecontent"
                                },
                            ],
                            type: "folder",
                        },
                    ],
                    type: "folder",
                },
                {
                    name: "Test Stuff",
                    content: [
                        {
                            name: "Testmefolder1",
                            content: [
                                {
                                    name: "asdf file",
                                    type: "text",
                                    content: "testfilecontent"
                                },
                            ],
                            type: "folder",
                        },
                        {
                            name: "2foldertestme",
                            content: [
                                {
                                    name: "Testmefolder1",
                                    content: [
                                        {
                                            name: "asdf file",
                                            type: "text",
                                            content: "testfilecontent"
                                        },
                                    ],
                                    type: "folder",
                                },
                            ],
                            type: "folder",
                        },
                    ],
                    type: "folder",
                },
                {
                    name: "Resume",
                    content: {
                        text: "alskdjflkas;djf;lkasjdlk;fasl;kdfklj;ajskl;dkfljjklsadfkl;dsaljlfk;sda;jlkf",
                        pdf: "https://drive.google.com/file/d/1bM3kPdVRhv80zde3OtcBBCqlprn4rPN6/preview"
                    },
                    type: "text/pdf"
                }
            ],

        }
        this.firstPos = {
            x: 0,
            y: 0
        }
    }
    componentDidMount() {
        //adding listeners for the green box when you drag mouse
        document.getElementById("HomeScreen").addEventListener("mouseup", this.onMouseUp);
        document.getElementById("HomeScreen").addEventListener("mousedown", this.onMouseDown);
    }
    onMouseUp = (e) => {
        if (e.which === 1) {
            try { //cause JavaScript...
                document.removeEventListener('mousemove', this.drawBox);
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
            document.addEventListener('mousemove', this.drawBox);
        }
    }
    drawBox = (e) => {
        //doing extreme programmer math
        let secondPos = { //will hold the currentPosition of cursor
            x: e.pageX,
            y: e.pageY
        }
        let posDiff = { //difference between the starting point and current point.
            x: this.firstPos.x - secondPos.x,
            y: this.firstPos.y - secondPos.y,
        }
        let size = { //size of the box
            w: Math.abs(e.pageX - this.firstPos.x),
            h: Math.abs(e.pageY - this.firstPos.y)
        }
        let box = document.getElementById("selectBox");
        if (box === null) {
            //drawing initial box
            box = document.createElement("div");
            box.id = "selectBox";
            box.style.width = "0px";
            box.style.height = "0px";
            box.style.position = "absolute";
            box.style.top = this.firstPos.y + "px";
            box.style.left = this.firstPos.x + "px";
            document.getElementById("HomeScreen").appendChild(box);
        } else {
            //reseting an existing box
            box.classList.remove("hideBox");
            box.style.width = "0px";
            box.style.height = "0px";
            box.style.position = "absolute";
            box.style.top = this.firstPos.y + "px";
            box.style.left = this.firstPos.x + "px";
        }
        //updating box size
        box.style.width = size.w + "px";
        box.style.height = size.h + "px";
        //update box position (all the fancy stuff to translate the box)
        if (posDiff.x > 0) box.style.left = this.firstPos.x - posDiff.x + "px";
        else box.style.left = this.firstPos.x + "px";
        if (posDiff.y > 0) box.style.top = this.firstPos.y - posDiff.y + "px";
        else box.style.top = this.firstPos.y + "px";
    }
    randomNum = () => {
        return Math.floor(Math.random() * 256) + 1;
    }
    handleFolderClick = (e, name, data) => {
        let newExplorerWindow = this.state.explorerWindows;
        let newKey = this.randomNum();
        if (typeof this.state.explorerWindows[newKey] !== "undefined") {
            this.handleFolderClick(e, name, data);
        } else {
            newExplorerWindow[newKey] = <Explorer handleFileOption={this.handleFileOption} handleTextDocClick={this.handleTextDocClick} closeAllExplorers={this.closeAllExplorers} handleClose={this.handleExplorerClose} key={newKey} explorerKey={newKey} data={data} name={name} />;
            this.setState({
                explorerWindows: newExplorerWindow,
            });
        }
    }
    handleTextDocClick = (e, name, data) => {
        let newTextViewerWindow = this.state.textViewerWindows;
        let newKey = this.randomNum();
        if (typeof this.state.textViewerWindows[newKey] !== "undefined") {
            this.handleTextDocClick(e, name, data);
        } else {
            newTextViewerWindow[newKey] = <TextViewer handleClose={this.handleTextViewerClose} key={newKey} textViewerKey={newKey} data={data} name={name} />;
            this.setState({
                textViewerWindows: newTextViewerWindow,
            });
        }
    }
    handlePDFDocClick = (e, name, data) => {
        let newPDFViewerWindow = this.state.PDFViewerWindows;
        let newKey = this.randomNum();
        if (typeof this.state.PDFViewerWindows[newKey] !== "undefined") {
            this.handlePDFDocClick(e, name, data);
        } else {
            newPDFViewerWindow[newKey] = <PDFViewer handleClose={this.handlePDFViewerClose} key={newKey} pdfViewerKey={newKey} data={data} name={name} />;
            this.setState({
                PDFViewerWindows: newPDFViewerWindow,
            });
        }
    }
    handleFileOption = (e, name, data, question, options) => {
        let newFileOptionWindow = this.state.fileOptionWindows;
        let newKey = this.randomNum();
        if (typeof this.state.fileOptionWindows[newKey] !== "undefined") {
            this.handleFileOption(e, name, data, question, options);
        } else {
            newFileOptionWindow[newKey] = <PopupModal handlePDFDocClick={this.handlePDFDocClick} handleTextDocClick={this.handleTextDocClick} handleClose={this.handleFileOptionClose} key={newKey} popupModalKey={newKey} name={name} data={data} options={options} question={question} />;
            this.setState({
                fileOptionWindows: newFileOptionWindow,
            });
        }
    }
    handleExplorerClose = (e, key) => {
        let newExplorerWindow = { ...this.state.explorerWindows };
        newExplorerWindow[key] = undefined;
        this.setState({
            explorerWindows: newExplorerWindow,
        });
    }
    handleTextViewerClose = (e, key) => {
        let newTextWindow = { ...this.state.textViewerWindows };
        newTextWindow[key] = undefined;
        this.setState({
            textViewerWindows: newTextWindow,
        });
    }
    handlePDFViewerClose = (e, key) => {
        let newPDFWindow = { ...this.state.PDFViewerWindows };
        newPDFWindow[key] = undefined;
        this.setState({
            PDFViewerWindows: newPDFWindow,
        });
    }
    handleFileOptionClose = (e, key) => {
        let newFileOptionWindow = { ...this.state.fileOptionWindows };
        newFileOptionWindow[key] = undefined;
        this.setState({
            fileOptionWindows: newFileOptionWindow,
        });
    }
    closeAllExplorers = () => {
        this.setState({
            explorerWindows: {},
        });
    }
    renderAllWindows = () => {
        return (
            <div>
                {Object.keys(this.state.explorerWindows).map((key) => {
                    return this.state.explorerWindows[key];
                })}
                {Object.keys(this.state.textViewerWindows).map((key) => {
                    return this.state.textViewerWindows[key];
                })}
                {Object.keys(this.state.PDFViewerWindows).map((key) => {
                    return this.state.PDFViewerWindows[key];
                })}
                {Object.keys(this.state.fileOptionWindows).map((key) => {
                    return this.state.fileOptionWindows[key];
                })}
            </div>
        );
    }
    render() {
        return (
            <div id="HomeScreen" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="shortcut-wrapper">
                    {this.state.homeFolders.map((x) => {
                        return <MediumIcon handleFileOption={this.handleFileOption} handleTextDocClick={this.handleTextDocClick} handleFolderClick={this.handleFolderClick} data={x} />
                    })}
                </div>
                {this.renderAllWindows()}
            </div>
        );
    }
}

export default HomeScreen;
