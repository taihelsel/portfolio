import React, { Component } from 'react';
import BackgroundImage from "../../media/background2.jpg";
import './HomeScreen.css';

import MediumIcon from "../MediumIcon/MediumIcon.js";
import Explorer from "../Explorer/Explorer.js";
class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            explorerWindows: {},
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
                                    name: "asdfasdfasdfasdf file",
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
        }
        this.firstPos = {
            x: 0,
            y: 0
        }
    }
    componentDidMount() {
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
            newExplorerWindow[newKey] = <Explorer closeAllExplorers={this.closeAllExplorers} handleClose={this.handleExplorerClose} explorerKey={newKey} data={data} name={name} />;
            this.setState({
                explorerWindows: newExplorerWindow,
            });
        }
    }
    handleExplorerClose = (e, key) => {
        let newExplorerWindow = {...this.state.explorerWindows};
        newExplorerWindow[key] = undefined;
        this.setState({
            explorerWindows: newExplorerWindow,
        });
    }
    closeAllExplorers = () => {
        this.setState({
            explorerWindows: {},
        });
    }
    render() {
        return (
            <div id="HomeScreen" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="shortcut-wrapper">
                    {this.state.homeFolders.map((x) => {
                        return <MediumIcon handleClick={this.handleFolderClick} data={x} />
                    })}
                </div>
                {Object.keys(this.state.explorerWindows).map((key) => {
                    return this.state.explorerWindows[key];
                })}
            </div>
        );
    }
}

export default HomeScreen;
