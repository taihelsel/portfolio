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
      currentlyDisplayedDrop:null
    }
  }
  dropDownShouldRender = () => {
    if(this.state.currentlyDisplayedDrop !== null && typeof this.state.currentlyDisplayedDrop.length !== "undefined"){
      return <SettingsDropDown data={this.state[this.state.currentlyDisplayedDrop]} />
    }
  }
  showDropDown = (e) => {
    const n  = e.currentTarget.innerText.toLowerCase() + "Dropdown";
    this.setState({
      currentlyDisplayedDrop:n
    });
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
      <div className="explorer">
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
              {this.dropDownShouldRender()}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Explorer;
