import React, { Component } from 'react';
import './Explorer.css';

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
          handleClick: function () {
            console.log("new tab clicked");
          }
        },
        {
          title: "New Window",
          shortcut: "Ctrl+N",
          handleClick: function () {
            console.log("New Window clicked");
          }
        },
        {
          title: "Create New Folder",
          shortcut: "Shift+Ctrl+N",
          handleClick: function () {
            console.log("Create New Folder clicked");
          }
        },
        {
          title: "Create New Document",
          handleClick: function () {
            console.log("Create New Document clicked");
          }
        },
        {
          title: "Close All Windows",
          handleClick: function () {
            console.log("Close All Windows clicked");
          }
        },
        {
          title: "Close",
          handleClick: function () {
            console.log("Close clicked");
          }
        },
      ],
      editDropdown: [
        {
          title: "Select All",
          shortcut: "Ctrl+A",
          handleClick: function () {
            console.log("select all clicked");
          }
        },
        {
          title: "Invert Selection",
          shortcut: "Shift+Ctrl+I",
          handleClick: function () {
            console.log("Invert Selection clicked");
          }
        },
      ],
      goDropdown: [
        {
          title: "Home",
          handleClick: function () {
            console.log("Home clicked");
          }
        },
        {
          title: "Resume",
          handleClick: function () {
            console.log("Resume clicked");
          }
        },
        {
          title: "GitHub",
          handleClick: function () {
            console.log("GitHub clicked");
          }
        },
        {
          title: "LinkedIn",
          handleClick: function () {
            console.log("LinkedIn clicked");
          }
        },
      ],
      helpDropdown: [
        {
          title: "Settings menu todo",
          handleClick: function () {
            console.log("new help todo clicked");
          }
        },
      ],
      currentlyDisplayedDrop: null,
    }
    this.firstMoveOffset = null
  }

  resetExplorerSettings = () => {
    if (typeof document.getElementsByClassName("explorer-settings-label-selected")[0] !== "undefined") {
      document.getElementsByClassName("explorer-settings-label-selected")[0].classList.remove("explorer-settings-label-selected");
    }
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
    if (this.state.currentlyDisplayedDrop !== null && typeof this.state.currentlyDisplayedDrop.length !== "undefined" && this.state.currentlyDisplayedDrop === x + "Dropdown") {
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
    this.props.handleClose(e, this.props.explorerKey);
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
    this.setState({
      name: name,
      data: data,
    })
  }
  handleMouseUp = (e) => {
    this.firstMoveOffset = null;
    document.removeEventListener('mousemove', this.moveExplorer);
  }
  handleMouseDown = (e) => {
    document.addEventListener('mousemove', this.moveExplorer);
  }
  moveExplorer = (e) => {
    let explorerEl = document.getElementById("explorer" + this.props.explorerKey);
    let explorerElStyle = getComputedStyle(explorerEl);
    let currentPos = {
      x:parseFloat(explorerElStyle.getPropertyValue("left")),
      y:parseFloat(explorerElStyle.getPropertyValue("top")),
    }
    if(this.firstMoveOffset === null) this.firstMoveOffset = e.pageX - currentPos.x;
    let newX = e.pageX - this.firstMoveOffset;
    let newY = e.pageY;
    if(newX>0){
      explorerEl.style.left = newX + "px";
    }
    if(newY>0){
      explorerEl.style.top = newY + "px";
    }
  }
  render() {
    return (
      <div id={"explorer" + this.props.explorerKey} className="explorer" onClick={this.handleExplorerClick}>
        <div className="explorer-head" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} >
          <h3 className="explorer-title">{this.state.name}</h3>
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
        </div>
        <div className="explorer-body">
          <ul className="explorer-sidebar">
            <li className="explorer-sidebar-section" onClick={this.handleSidebarClick}>
              <h1 className="explorer-sidebar-section-head"><i className="explorer-sidebar-section-icon">&#x25BA;</i>My Computer</h1>
              <ul className="explorer-sidebar-items">
                <li>Home</li>
                <li>Desktop</li>
                <li>Projects</li>
                <li>Resume</li>
              </ul>
            </li>
          </ul>
          <ul className="explorer-content">
            {this.state.data.map((x) => {
              return <li><MediumIcon handleClick={this.handleFolderClick} data={x} /></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Explorer;
