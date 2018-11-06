import React, { Component } from 'react';
import BackgroundImage from "../../media/background.jpg";
import './HomeScreen.css';

class HomeScreen extends Component {
    constructor() {
        super();
        this.firstPos = {
            x: 0,
            y: 0
        }
    }
    componentDidMount() {
        document.getElementById("HomeScreen").addEventListener("mouseup", this.onMouseUp);
        document.getElementById("HomeScreen").addEventListener("mousedown", this.onMouseDown);
    }
    onMouseUp = () => {
        document.removeEventListener('mousemove', this.drawBox);
        document.getElementById("selectBox").remove();
    }
    onMouseDown = (e) => {
        this.firstPos = {
            x: e.pageX,
            y: e.pageY
        }
        document.addEventListener('mousemove', this.drawBox);
    }
    drawBox = (e) => {
        let secondPos = {
            x: e.pageX,
            y: e.pageY
        }
        let posDiff = {
            x: this.firstPos.x - secondPos.x,
            y: this.firstPos.y - secondPos.y,
        }
        let size = {
            w: Math.abs(e.pageX - this.firstPos.x),
            h: Math.abs(e.pageY - this.firstPos.y)
        }
        let box = document.getElementById("selectBox");
        if (box === null) {
            box = document.createElement("div");
            box.id = "selectBox";
            box.style.width = "0px";
            box.style.height = "0px";
            box.style.position = "absolute";
            box.style.top = this.firstPos.y + "px";
            box.style.left = this.firstPos.x + "px";
            document.getElementById("HomeScreen").appendChild(box);
        }
        box.style.width = size.w + "px";
        box.style.height = size.h + "px";
        if (posDiff.x > 0) {
            box.style.left = this.firstPos.x - posDiff.x + "px";
        }
        if (posDiff.y > 0) {
            box.style.top = this.firstPos.y - posDiff.y + "px";
        }
    }
    render() {
        return (
            <div id="HomeScreen" style={{ backgroundImage: `url(${BackgroundImage})` }}>

            </div>
        );
    }
}

export default HomeScreen;
