import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div id="Footer">
        <ul className="nav">
          <li className="nav-item">
            <img className="nav-item-icon" src={require("../.././media/icons/logo.png")} alt="Linux Mint Logo" />
            <h3 className="nav-item-text">Menu</h3>
          </li>
          <li className="nav-item">
            <img className="nav-item-icon" src={require("../.././media/icons/user-desktop.png")} alt="Desktop shortcut" />
          </li>
          <li className="nav-item">
            <img className="nav-item-app-icon" src={require("../.././media/icons/chrome.png")} alt="Google Chrome Logo" />
          </li>
          <li className="nav-item">
            <img className="nav-item-app-icon" src={require("../.././media/icons/folder.png")} alt="Google Chrome Logo" />
          </li>
        </ul>
      </div>
    );
  }
}

export default Footer;
