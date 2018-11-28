import React, { Component } from 'react';
import BackgroundImage from "../../media/background2.jpg";
import './HomeScreen.css';
//Static Data
import { HomeData } from "../../data/HomeData.js";

import { drawBox } from "../../handlers/drawBoxHandler.js";
//ReactComponents
import MediumIcon from "../MediumIcon/MediumIcon.js";
class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
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
                document.getElementById("selectBox").remove();
            } catch{ };
        }
    }
    onMouseDown = (e) => {
        if (e.which === 1 && e.target.id === "HomeScreen") {
            let selectBox = document.getElementById("selectBox");
            if (selectBox) document.getElementById("selectBox").remove();
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
    handleDrawBox = (e) => drawBox(e,false, "HomeScreen", this.firstPos, this.iconLocations);
    unselectAllItems = () => {
        let parentEl = document.getElementById("HomeScreen");
        let x = parentEl.getElementsByClassName("medium-icon");
        for (let i = 0; i < x.length; i++) {
            if (x[i].classList.contains("selected-icon")) {
                x[i].classList.remove("selected-icon");
            }
        }
    }
    handleHomeScreenClick = (e) => {
        let selectBox = document.getElementById("selectBox");
        if (selectBox !== null && selectBox.classList.contains("recently-selected")) {
            selectBox.classList.remove("recently-selected");
        } else if (e.target.id === "HomeScreen") this.unselectAllItems();

    }
    render() {
        return (
            <div id="HomeScreen" style={{ backgroundImage: `url(${BackgroundImage})` }} onClick={this.handleHomeScreenClick}>
                <div className="shortcut-wrapper">
                    {this.state.homeFolders.map((x, i) => {
                        return <MediumIcon key={"homescreen-icon" + i} unselectAllIcons={this.unselectAllItems} handlePopupModal={this.props.handlePopupModal} handleFileViewerOpen={this.props.handleFileViewerOpen} handleFolderClick={this.props.handleExplorerOpen} data={x} />
                    })}
                </div>
            </div>
        );
    }
}

export default HomeScreen;
