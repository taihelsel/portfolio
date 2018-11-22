import React, { Component } from 'react';
import BackgroundImage from "../../media/background2.jpg";
import './HomeScreen.css';

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
            homeFolders: [
                {
                    name: "Projects",
                    content: [
                        {
                            name: "KayT Portfolio",
                            content: [
                                { name: "Project Info", type: "text", content: `• Role - Front End Developer\r\n• Tech Used - JavaScript | HTML5 | CSS3` },
                                { name: "Project Preview", type: "img", content: "kayt.gif" },
                                { name: "Live Site", type: "html", content: "https://taihelsel.github.io/kayt-mockup/" },
                                { name: "Project GitHub", type: "html", content: "https://github.com/taihelsel/kayt-mockup" },
                            ],
                            type: "folder",
                        },
                        {
                            name: "CryptoApp",
                            content: [
                                { name: "Project Info", type: "text", content: `• Role - Front End & Back End Developer\r\n• Tech Used - JavaScript | HTML5 | CSS3 | Bootstrap | EJS | NodeJS | Express | PostgreSQL | Sequelize` },
                                { name: "Project Preview", type: "img", content: "cryptoapp.gif" },
                                { name: "Database Outline", type: "img", content: "cryptoappdbstructure.png" },
                                { name: "Live Site", type: "html", content: "https://cryptocurrencyalert.herokuapp.com/auth/signup" },
                                { name: "Project GitHub", type: "html", content: "https://github.com/taihelsel/project2-cryptoApp" },
                            ],
                            type: "folder",
                        },
                        {
                            name: "Restaurant Redesign",
                            content: [
                                { name: "Project Info", type: "text", content: `• Role - Front End Developer\r\n• Tech Used - JavaScript | HTML5 | CSS3` },
                                { name: "Project Preview", type: "img", content: "restredesign.gif" },
                                { name: "Live Site", type: "html", content: "https://taihelsel.github.io/restaurant-mockup/" },
                                { name: "Project GitHub", type: "html", content: "https://github.com/taihelsel/restaurant-mockup" },
                            ],
                            type: "folder",
                        },
                        {
                            name: "2048 Remake",
                            content: [
                                { name: "Project Info", type: "text", content: `• Role - Front End Developer\r\n• Tech Used - JavaScript | HTML5 | CSS3` },
                                { name: "Project Preview", type: "img", content: "2048remake.gif" },
                                { name: "Live Site", type: "html", content: "https://taihelsel.github.io/game-project-host/games/2048/index.html" },
                                { name: "Project GitHub", type: "html", content: "https://github.com/taihelsel/game-project-host/tree/master/games/2048" },
                            ],
                            type: "folder",
                        },
                        {
                            name: "Image Classifier",
                            content: [
                                { name: "Project Info", type: "text", content: `• Role - Front End Developer & Machine Learning Engineer\r\n• Tech Used - Docker | Python3 | Tensorflow | Django | Jinja2 | JavaScript | JQuery | HTML5 | CSS3 | Boostrap` },
                                { name: "Project Preview", type: "img", content: "sfwclassifier.gif" },
                                { name: "Live Site", type: "html", content: "https://sfw-nsfw-image-classifier.herokuapp.com/classify_image/classify/" },
                                { name: "Project GitHub", type: "html", content: "https://github.com/taihelsel/image-classify-server" },
                            ],
                            type: "folder",
                        },
                    ],
                    type: "folder",
                },
                {
                    name: "Resume",
                    content: {
                        text: `====================\r\n|      SUMMARY     |\r\n====================\r\nA self-taught web developer with a passion for all things JavaScript. For the past 2 years, I\r\nhave practiced, studied, and developed open source applications that utilize the JavaScript\r\nlanguage. From basic single page applications to Full Stack applications. I have a well rounded\r\nunderstanding of JavaScript and how things should be done.\r\n====================\r\n|      CONTACT     |\r\n====================\r\n*Email - tai.helsel@gmail.com\r\n*Phone - (253)-670-8508\r\n*Location - Seattle, WA\r\n*Portfolio - https://taihelsel.github.io/portfolio/\r\n*GitHub - https://github.com/taihelsel\r\n*LinkedIn - https://www.linkedin.com/in/taihelsel/\r\n====================\r\n|      Skills      |\r\n====================\r\n->   FRONT END   <-\r\n* React\r\n* Javascript\r\n* HTML\r\n* CSS\r\n* EJS\r\n\r\n->   BACK END   <-\r\n* Node.JS\r\n* Express\r\n* Sequelize\r\n* Mongo\r\n* Postgres\r\n* SQL\r\n\r\n->   OTHER   <-\r\n* Browser Extensions\r\n* MapBox\r\n* HighCharts\r\n* Version Control with Git\r\n====================\r\n|     PROJECTS     |\r\n====================\r\n----------------------------------------------------------------\r\n->                KayT Makeup Artist Mar. 2018                <-\r\n----------------------------------------------------------------\r\nThis was a mockup that I made for a client. My responsibilities were to design, and develop\r\nthis website to be both mobile and desktop friendly.\r\nThis project uses: JavaScript | JQuery | HTML5 | CSS3\r\n----------------------------------------------------------------\r\n->                  Trip Planner June 2018                    <-\r\n----------------------------------------------------------------\r\nTrip planner is an application that allows you to plan a trip and nd\r\nthings to do along your\r\nroute. This project was built in ~10hrs for the 2018 General Assembly Hackathon.\r\nTrip planner uses : React | JavaScript | HTML5 | CSS3 | Google Maps API | Google Maps Boxer API\r\n----------------------------------------------------------------\r\n->               OS-Blogger May 2018 to Current               <-\r\n----------------------------------------------------------------\r\nos-blogger is a full stack application built on the MERN stack. The idea behind the project is to\r\nmake an "all in one package" for non-technical bloggers/writers. I am currently still building this project.\r\nThis project uses: React | JavaScript | HTML5 | CSS3 | Node.js | Express | MongoDB | Mongoose\r\n----------------------------------------------------------------\r\n->                    CryptoApp Jan. 2018                     <-\r\n----------------------------------------------------------------\r\nCryptoApp is an app that will track real-time changes in the crypto marketplace. Users can set\r\nup custom alerts for changes in the market.\r\nThis project uses: CoinMarketCap and Ethplorer API | Javascript | Jquer | HTML | CSS | PostgreSQ | Express | NodeJS\r\n====================\r\n|    EXPERIENCE    |\r\n====================\r\n----------------------------------------------------------------\r\n->      RTRT.me - Web Developer May 2018 to Nov. 2018         <-\r\n----------------------------------------------------------------\r\n* Built custom applications that interact with the RTRT.me API\r\n* Developed custom UI using CSS\r\n* Located and fixed broken JavaScript code\r\n* Optimized JavaScript functions\r\n* Updated old JQuery functions to ES2015\r\n* Used Git | HTML | CSS | JavaScript, NodeJS | MongoDB | Mongoose | JQuery | EJS\r\n----------------------------------------------------------------\r\n-> Freelance Developer - Web Developer Apr. 2018 to July 2018 <-\r\n----------------------------------------------------------------\r\n* Provided guidance on React/Front End projects.\r\n* Built reusable react components\r\n* Increased speed of code by reducing unnecessary loops and state changes\r\n* Refactored large portions of JavaScript code to ES2015 standards\r\n* Design and develop custom UI for several projects\r\n* Used Git | ReactJS | NodeJS | JavaScript | HTML | CSS\r\n----------------------------------------------------------------\r\n->  General Assembly - Web Developer Nov. 2017 to Feb. 2018   <-\r\n----------------------------------------------------------------\r\n* A full-time course where I developed applications that utilized HTML, CSS, JavaScript,\r\nReactJS, NodeJS, Express, MongoDB, Mongoose, PostgreSQL, Sequelize, and Python\r\n====================\r\n|      Awards      |\r\n====================\r\n* General Assembly Hackathon Winner June 2018`,
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
            newExplorerWindow[newKey] = <Explorer handleFileOption={this.handleFileOption} handleTextDocClick={this.handleTextDocClick} handleImageFileClick={this.handleImageFileClick} closeAllExplorers={this.closeAllExplorers} handleClose={this.handleExplorerClose} key={newKey} explorerKey={newKey} data={data} name={name} />;
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
    handleImageFileClick = (e, name, data) => {
        let newImageViewerWindow = this.state.imageViewerWindows;
        let newKey = this.randomNum();
        if (typeof this.state.imageViewerWindows[newKey] !== "undefined") {
            this.handleImageFileClick(e, name, data);
        } else {
            newImageViewerWindow[newKey] = <ImageViewer handleClose={this.handleImageViewerClose} key={newKey} imageViewerKey={newKey} data={data} name={name} />;
            this.setState({
                imageViewerWindows: newImageViewerWindow,
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
    handleImageViewerClose = (e, key) => {
        let newImageWindow = { ...this.state.imageViewerWindows };
        newImageWindow[key] = undefined;
        this.setState({
            imageViewerWindows: newImageWindow,
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
                {Object.keys(this.state.imageViewerWindows).map((key) => {
                    return this.state.imageViewerWindows[key];
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
                        return <MediumIcon handleFileOption={this.handleFileOption} handleTextDocClick={this.handleTextDocClick} handleImageFileClick={this.handleImageFileClick} handleFolderClick={this.handleFolderClick} data={x} />
                    })}
                </div>
                {this.renderAllWindows()}
            </div>
        );
    }
}

export default HomeScreen;
