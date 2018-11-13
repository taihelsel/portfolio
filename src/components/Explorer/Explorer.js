import React, { Component } from 'react';
import './Explorer.css';

import SettingsDropDown from "../SettingsDropDown/SettingsDropDown.js";
class Explorer extends Component {
  constructor() {
    super();
    this.state = {
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
          title: "Settings menu todo",
          handleClick: function () {
            console.log("new edit todo clicked");
          }
        },
      ],
      viewDropdown: [
        {
          title: "Settings menu todo",
          handleClick: function () {
            console.log("new view todo clicked");
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
      currentlyDisplayedDrop: null
    }
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
  handleMin = () => {
    console.log("minimize clicked");
  }
  handleMax = () => {
    console.log("maximize clicked");
  }
  handleClose = () => {
    console.log("close clicked");
  }
  render() {
    return (
      <div className="explorer" onClick={this.handleExplorerClick}>
        <div className="explorer-head">
          <h3 className="explorer-title">actions</h3>
          <ul className="explorer-controls">
            <li onClick={this.handleMin}>-</li>
            <li onClick={this.handleMax}>+</li>
            <li onClick={this.handleClose}>x</li>
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
              <h3 className="explorer-settings-label" onClick={this.showDropDown}>View</h3>
              {this.shouldDropdownRender("view")}
            </li>
            <li>
              <h3 className="explorer-settings-label" onClick={this.showDropDown}>Help</h3>
              {this.shouldDropdownRender("help")}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Explorer;
