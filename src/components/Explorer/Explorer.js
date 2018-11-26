import React, { Component } from 'react';
import './Explorer.css';

//Static Data
import {HomeData} from "../../data/HomeData.js";

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
          title: "New Tab",
          shortcut: "Ctrl+T",
          handleClick: () => {
            console.log("new tab clicked");
          }
        },
        {
          title: "New Window",
          shortcut: "Ctrl+N",
          handleClick: () => {
            console.log("New Window clicked");
          }
        },
        {
          title: "Create New Folder",
          shortcut: "Shift+Ctrl+N",
          handleClick: () => {
            console.log("Create New Folder clicked");
          }
        },
        {
          title: "Create New Document",
          handleClick: () => {
            console.log("Create New Document clicked");
          }
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
          shortcut: "Ctrl+A",
          handleClick: () => {
            console.log("select all clicked");
          }
        },
        {
          title: "Invert Selection",
          shortcut: "Shift+Ctrl+I",
          handleClick: () => {
            console.log("Invert Selection clicked");
          }
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
      backArrow:[],
      forwardArrow:[]
    }
    this.firstMoveOffset = null
  }
  componentDidMount(){
    this.setAsActiveExplorer();
  }
  resetExplorerSettings = () => {
    if (typeof document.getElementsByClassName("explorer-settings-label-selected")[0] !== "undefined") {
      document.getElementsByClassName("explorer-settings-label-selected")[0].classList.remove("explorer-settings-label-selected");
    }
  }
  setAsActiveExplorer = () => {
    try{
      document.getElementsByClassName("selected-explorer")[0].classList.remove("selected-explorer");
    }catch{}
    document.getElementById("explorer" + this.props.uniqueKey).classList.add("selected-explorer");
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
    console.log("maximize clicked");
  }
  handleExplorerClose = (e) => {
    this.props.handleClose(e, this.props.uniqueKey);
  }
  handleSidebarClick = (e) => {
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
    let x = this.state.backArrow;
    x.push({
      name:this.state.name,
      data:this.state.data
    });
    this.setState({
      backArrow:x,
      forwardArrow:[],
      name: name,
      data: data,
    })
  }
  handleTextDocClick = (e,name,data) => {
    this.props.handleTextDocClick(e,name,data);
  }
  
  handleImageFileClick = (e,name,data) => {
    this.props.handleImageFileClick(e,name,data);
  }

  handleMouseUp = (e) => {
    this.firstMoveOffset = null;
    document.removeEventListener('mousemove', this.moveExplorer);
  }
  handleMouseDown = (e) => {
    document.addEventListener('mousemove', this.moveExplorer);
  }
  moveExplorer = (e) => {
    let explorerEl = document.getElementById("explorer" + this.props.uniqueKey);
    let explorerElStyle = getComputedStyle(explorerEl);
    let currentStyle = {
      x: parseFloat(explorerElStyle.getPropertyValue("left")),
      y: parseFloat(explorerElStyle.getPropertyValue("top")),
      width: parseFloat(explorerElStyle.getPropertyValue("width")),
      height: parseFloat(explorerElStyle.getPropertyValue("height")),
    }
    if (this.firstMoveOffset === null) this.firstMoveOffset = e.pageX - currentStyle.x;
    let newX = e.pageX - this.firstMoveOffset;
    let newY = e.pageY;
    if (newX > 0 && currentStyle.width + newX < window.innerWidth) {
      explorerEl.style.left = newX + "px";
    }
    if (newY > 0 && currentStyle.height + newY < window.innerHeight) {
      explorerEl.style.top = newY + "px";
    }
  }
  handleBackArrowClick = (e) => {
    //first check if empty
    if(this.state.backArrow.length>0){
      let newData = this.state.backArrow[this.state.backArrow.length-1];
      //verify contents are not already being displayed
      if(newData.data !== this.state.data || newData.name !== this.state.name){
        //update data to be displayed and update back arrow history.
        let newBackArrow = this.state.backArrow;
        let newForwardArrow = this.state.forwardArrow;
        newBackArrow.pop();
        newForwardArrow.push({
          name:this.state.name,
          data:this.state.data
        });
        this.setState({
          name:newData.name,
          data:newData.data,
          backArrow:newBackArrow,
          forwardArrow:newForwardArrow
        });
      }
    }
  }
  handleForwardArrowClick = (e) => {
    //first check if empty
    if(this.state.forwardArrow.length>0){
      let newData = this.state.forwardArrow[this.state.forwardArrow.length-1];
      //verify contents are not already being displayed
      if(newData.data !== this.state.data || newData.name !== this.state.name){
        //update data to be displayed and update forward arrow history
        let newForwardArrow = this.state.forwardArrow;
        let newBackArrow = this.state.backArrow;
        newForwardArrow.pop();
        newBackArrow.push({
          name:this.state.name,
          data:this.state.data
        });
        this.setState({
          name:newData.name,
          data:newData.data,
          forwardArrow:newForwardArrow,
          backArrow:newBackArrow
        });
      }
    }
  }
  renderDesktop = () => this.setState({ data:HomeData,name:"Desktop",backArrow:[],forwardArrow:[],});
  renderProjects = ()=> this.setState({data:HomeData[0].content,name:"Projects",backArrow:[],forwardArrow:[]});
  renderResume = () => this.props.handleFileOption(null, HomeData[1].name, HomeData[1].content, "View file as", ["text", "pdf"]);
  renderLinkedIn = () => window.open("https://www.linkedin.com/in/taihelsel/");
  renderGitHub = () => window.open("https://github.com/taihelsel");
  render() {
    return (
      <div id={"explorer" + this.props.uniqueKey} className="explorer" onMouseDown={this.setAsActiveExplorer} onClick={this.handleExplorerClick}>
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
            <div onClick={this.handleBackArrowClick} className={this.state.backArrow.length>0?"":"explorer-nav-disabled"}>
              <img src={require("../.././media/icons/leftarrow.svg")} />
            </div>
            <div onClick={this.handleForwardArrowClick}  className={this.state.forwardArrow.length>0?"":"explorer-nav-disabled"}>
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
          <ul className="explorer-content">
            {this.state.data.map((x) => {
              return <li><MediumIcon handleFileOption={this.props.handleFileOption} handleTextDocClick={this.handleTextDocClick} handleImageFileClick={this.handleImageFileClick} handleFolderClick={this.handleFolderClick} data={x} /></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Explorer;
