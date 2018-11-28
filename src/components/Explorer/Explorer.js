import React, { Component } from 'react';
import './Explorer.css';

//Static Data
import { HomeData } from "../../data/HomeData.js";
//generic handlers
import { moveWindow } from "../../handlers/windowHandlers.js";
import { drawBox } from "../../handlers/drawBoxHandler.js";
//React Components
import MediumIcon from "../MediumIcon/MediumIcon.js";
import SettingsDropDown from "../SettingsDropDown/SettingsDropDown.js";
class Explorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      data: this.props.data,
      fileDropdown: [
        {
          title: "New Window",
          // shortcut: "Ctrl+N",
          handleClick: () => this.renderNewExplorer(),
        },
        {
          title: "Close All Windows",
          handleClick: this.props.closeAllExplorers,
        },
        {
          title: "Close",
          handleClick: this.handleExplorerClose,
        },
      ],
      editDropdown: [
        {
          title: "Select All",
          // shortcut: "Ctrl+A",
          handleClick: () => this.selectAllItems(),
        },
        {
          title: "Invert Selection",
          // shortcut: "Shift+Ctrl+I",
          handleClick: () => this.invertSelection(),
        },
      ],
      goDropdown: [
        {
          title: "Desktop",
          handleClick: () => this.renderDesktop(),
        },
        {
          title: "Resume",
          handleClick: () => this.renderResume(),
        },
        {
          title: "GitHub",
          handleClick: () => this.renderGitHub(),
        },
        {
          title: "LinkedIn",
          handleClick: () => this.renderLinkedIn(),
        },
      ],
      helpDropdown: [
        {
          title: "Settings menu todo",
          handleClick: () => {
            console.log("new help todo clicked");
          }
        },
      ],
      currentlyDisplayedDrop: null,
      backArrow: [],
      forwardArrow: []
    }
    this.firstMoveOffset = null
    this.firstPos = { x: 0, y: 0 }
    this.iconLocations = []
  }
  componentDidMount() {
    this.setAsActiveExplorer();
  }
  resetExplorerSettings = () => {
    if (typeof document.getElementsByClassName("explorer-settings-label-selected")[0] !== "undefined") {
      document.getElementsByClassName("explorer-settings-label-selected")[0].classList.remove("explorer-settings-label-selected");
    }
  }
  setAsActiveExplorer = () => {
    try {
      document.getElementsByClassName("selected-explorer")[0].classList.remove("selected-explorer");
    } catch{ }
    document.getElementById(this.props.uniqueKey).classList.add("selected-explorer");
  }
  handleMouseUp = (e) => {
    let el = document.getElementById(this.props.uniqueKey);
    if(el.classList.contains("explorer-fullscreen")===false){
      this.firstMoveOffset = null;
      document.removeEventListener('mousemove', this.moveExplorer);
    }
  }
  handleMouseDown = (e) => {
    let el = document.getElementById(this.props.uniqueKey);
    if(el.classList.contains("explorer-fullscreen")===false)document.addEventListener('mousemove', this.moveExplorer);
  }
  moveExplorer = (e) => {
    let x = moveWindow(e, this.props.uniqueKey, this.firstMoveOffset);
    if (x !== null) this.firstMoveOffset = x;
  }
  resetSettingsDropdown = () => {
    this.setState({
      currentlyDisplayedDrop: null,
    });
  }
  handleExplorerClick = (e) => {
    if (e.target.classList.contains("explorer-settings-label") !== true) {
      this.resetSettingsDropdown();
      this.resetExplorerSettings();
    }
  }
  showDropDown = (e) => {
    if (e.currentTarget.classList.contains("explorer-settings-label-selected")) {
      this.resetSettingsDropdown();
      this.resetExplorerSettings();
    } else {
      this.resetExplorerSettings();
      e.currentTarget.classList.add("explorer-settings-label-selected");
      const n = e.currentTarget.innerText.toLowerCase() + "Dropdown";
      this.setState({
        currentlyDisplayedDrop: n
      });
    }
  }
  shouldDropdownRender = (x) => {
    if (this.state.currentlyDisplayedDrop !== null && typeof this.state.currentlyDisplayedDrop.length !== "undefined" && this.state.currentlyDisplayedDrop === x.toLowerCase() + "Dropdown") {
      return <SettingsDropDown data={this.state[this.state.currentlyDisplayedDrop]} />
    }
  }
  handleExplorerMin = () => {
    console.log("minimize clicked");
  }
  handleExplorerMax = () => {
    let el = document.getElementById(this.props.uniqueKey);
    if(el.classList.contains("explorer-fullscreen")) el.classList.remove("explorer-fullscreen");
    else  el.classList.add("explorer-fullscreen");
  }
  handleExplorerClose = (e) => {
    this.props.handleClose(e, this.props.uniqueKey);
  }
  handleSidebarClick = (e) => {
    this.unselectAllItems();
    let target = e.target;
    let icon = e.currentTarget.getElementsByClassName("explorer-sidebar-section-icon")[0];
    if (icon.innerHTML === "\u25BA") {
      icon.innerHTML = "\u25BC";
      e.currentTarget.getElementsByClassName("explorer-sidebar-items")[0].style.display = "block";
    } else if (target.classList.contains("explorer-sidebar-section-head") || target.classList.contains("explorer-sidebar-section-icon")) {
      icon.innerHTML = "\u25BA";
      e.currentTarget.getElementsByClassName("explorer-sidebar-items")[0].style.display = "none";
    }
  }
  handleFolderClick = (e, name, data) => {
    this.unselectAllItems();
    let x = this.state.backArrow;
    x.push({
      name: this.state.name,
      data: this.state.data
    });
    this.setState({
      backArrow: x,
      forwardArrow: [],
      name: name,
      data: data,
    })
  }
  handleBackArrowClick = (e) => {
    //first check if empty
    if (this.state.backArrow.length > 0) {
      let newData = this.state.backArrow[this.state.backArrow.length - 1];
      //verify contents are not already being displayed
      if (newData.data !== this.state.data || newData.name !== this.state.name) {
        this.unselectAllItems();
        //update data to be displayed and update back arrow history.
        let newBackArrow = this.state.backArrow;
        let newForwardArrow = this.state.forwardArrow;
        newBackArrow.pop();
        newForwardArrow.push({
          name: this.state.name,
          data: this.state.data
        });
        this.setState({
          name: newData.name,
          data: newData.data,
          backArrow: newBackArrow,
          forwardArrow: newForwardArrow
        });
      }
    }
  }
  handleForwardArrowClick = (e) => {
    //first check if empty
    if (this.state.forwardArrow.length > 0) {
      let newData = this.state.forwardArrow[this.state.forwardArrow.length - 1];
      //verify contents are not already being displayed
      if (newData.data !== this.state.data || newData.name !== this.state.name) {
        this.unselectAllItems();
        //update data to be displayed and update forward arrow history
        let newForwardArrow = this.state.forwardArrow;
        let newBackArrow = this.state.backArrow;
        newForwardArrow.pop();
        newBackArrow.push({
          name: this.state.name,
          data: this.state.data
        });
        this.setState({
          name: newData.name,
          data: newData.data,
          forwardArrow: newForwardArrow,
          backArrow: newBackArrow
        });
      }
    }
  }
  selectAllItems = () => {
    let parentEl = document.getElementById(this.props.uniqueKey);
    let x = parentEl.getElementsByClassName("medium-icon");
    for (let i = 0; i < x.length; i++) {
      x[i].classList.add("selected-icon");
    }
  }
  invertSelection = () => {
    let parentEl = document.getElementById(this.props.uniqueKey);
    let x = parentEl.getElementsByClassName("medium-icon");
    for (let i = 0; i < x.length; i++) {
      if (x[i].classList.contains("selected-icon")) {
        x[i].classList.remove("selected-icon");
      } else {
        x[i].classList.add("selected-icon");
      }
    }
  }
  unselectAllItems = () => {
    let parentEl = document.getElementById(this.props.uniqueKey);
    let x = parentEl.getElementsByClassName("medium-icon");
    for (let i = 0; i < x.length; i++) {
      if (x[i].classList.contains("selected-icon")) {
        x[i].classList.remove("selected-icon");
      }
    }
  }
  renderNewExplorer = () => this.props.handleExplorerOpen(null, this.state.name, this.state.data);
  renderDesktop = () => this.setState({ data: HomeData, name: "Desktop", backArrow: [], forwardArrow: [], });
  renderProjects = () => this.setState({ data: HomeData[0].content, name: "Projects", backArrow: [], forwardArrow: [] });
  renderResume = () => this.props.handlePopupModal(null, HomeData[1].name, HomeData[1].content, "View file as", ["text", "pdf"]);
  renderLinkedIn = () => window.open("https://www.linkedin.com/in/taihelsel/");
  renderGitHub = () => window.open("https://github.com/taihelsel");

  handleContentClick = (e) =>{
    if(e.target.classList.contains("explorer-content")){
      this.unselectAllItems();
    }
  }
  handleMouseUpContent = (e) => {
    if (e.button === 0) {
      try { //cause JavaScript...
        document.removeEventListener('mousemove', this.handleDrawBox);
        document.getElementById("selectBox").remove();
      } catch{ };
    }
  }
  handleMouseDownContent = (e) => {
    if (e.button===0 && e.target.classList.contains("explorer-content")) {
      let selectBox = document.getElementById("selectBox");
      if (selectBox) document.getElementById("selectBox").remove();
      let parentEl =  document.getElementById(this.props.uniqueKey);
      let rect = parentEl.getElementsByClassName("explorer-content")[0].getBoundingClientRect();
      this.firstPos = {x: e.pageX,y: e.pageY};
      this.drawBoxOffset = rect;
      let icons = parentEl.getElementsByClassName("medium-icon");
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
  handleDrawBox = (e) => drawBox(e, true,this.props.uniqueKey, this.firstPos, this.iconLocations,this.drawBoxOffset);
  render() {
    return (
      <div id={this.props.uniqueKey} className="explorer" onMouseDown={this.setAsActiveExplorer} onClick={this.handleExplorerClick}>
        <div className="explorer-head">
          <h3 className="explorer-title" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>{this.state.name}</h3>
          <ul className="explorer-controls">
            <li onClick={this.handleExplorerMin}>-</li>
            <li onClick={this.handleExplorerMax}>+</li>
            <li onClick={this.handleExplorerClose}>x</li>
          </ul>
          <ul className="explorer-settings">
            <li>
              <h3 className="explorer-settings-label" onClick={this.showDropDown}>File</h3>
              {this.shouldDropdownRender("file")}
            </li>
            <li>
              <h3 className="explorer-settings-label" onClick={this.showDropDown}>Edit</h3>
              {this.shouldDropdownRender("edit")}
            </li>
            <li>
              <h3 className="explorer-settings-label" onClick={this.showDropDown}>Go</h3>
              {this.shouldDropdownRender("go")}
            </li>
            <li>
              <h3 className="explorer-settings-label" onClick={this.showDropDown}>Help</h3>
              {this.shouldDropdownRender("help")}
            </li>
          </ul>
          <div className="explorer-nav">
            <div onClick={this.handleBackArrowClick} className={this.state.backArrow.length > 0 ? "" : "explorer-nav-disabled"}>
              <img src={require("../.././media/icons/leftarrow.svg")} />
            </div>
            <div onClick={this.handleForwardArrowClick} className={this.state.forwardArrow.length > 0 ? "" : "explorer-nav-disabled"}>
              <img src={require("../.././media/icons/rightarrow.svg")} />
            </div>
          </div>
        </div>
        <div className="explorer-body">
          <ul className="explorer-sidebar">
            <li className="explorer-sidebar-section" onClick={this.handleSidebarClick}>
              <h1 className="explorer-sidebar-section-head"><i className="explorer-sidebar-section-icon">&#x25BA;</i>My Computer</h1>
              <ul className="explorer-sidebar-items">
                <li onClick={this.renderDesktop} >Desktop</li>
                <li onClick={this.renderProjects} >Projects</li>
                <li onClick={this.renderResume} >Resume</li>
                <li onClick={this.renderGitHub} >GitHub</li>
                <li onClick={this.renderLinkedIn} >LinkedIn</li>
              </ul>
            </li>
          </ul>
          <ul className="explorer-content" onClick={this.handleContentClick} onMouseDown={this.handleMouseDownContent} onMouseUp={this.handleMouseUpContent} >
            {this.state.data.map((x, i) => {
              return <li><MediumIcon key={this.props.uniqueKey + "-icon-" + i} unselectAllIcons={this.unselectAllItems} handlePopupModal={this.props.handlePopupModal} handleFileViewerOpen={this.props.handleFileViewerOpen} handleFolderClick={this.handleFolderClick} data={x} /></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Explorer;
