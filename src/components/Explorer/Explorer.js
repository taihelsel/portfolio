import React, { Component } from 'react';
import './Explorer.css';

class Explorer extends Component {
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
              <h3 className="explorer-settings-label">File</h3>
              <ul className="explorer-settings-dropdown">
                <li>
                  <h3 className="explorer-settings-dropdown-title">New Tab</h3>
                  <h3 className="explorer-settings-dropdown-shortcut">Ctrl+T</h3>
                </li>
                <li>
                  <h3 className="explorer-settings-dropdown-title">New Window</h3>
                  <h3 className="explorer-settings-dropdown-shortcut">Ctrl+N</h3>
                </li>
                <li>
                  <h3 className="explorer-settings-dropdown-title">Create New Folder</h3>
                  <h3 className="explorer-settings-dropdown-shortcut">Shift+Ctrl+N</h3>
                </li>
                <li>
                  <h3 className="explorer-settings-dropdown-title">Create New Document</h3>
                </li>
                <li>
                  <h3 className="explorer-settings-dropdown-title">Close All Windows</h3>
                </li>
                <li>
                  <h3 className="explorer-settings-dropdown-title">Close</h3>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Explorer;
