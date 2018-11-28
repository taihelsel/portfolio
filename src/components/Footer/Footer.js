import React, { Component } from 'react';
import './Footer.css';
//importing static data
import { HomeData } from "../../data/HomeData.js";
class Footer extends Component {
  handleFolderIconClick = (e) => {
    this.props.handleExplorerOpen(e, "Desktop", HomeData);
  }
  handleFooterTabClick = (e, key) => {
    let el = document.getElementById(key);
    try { document.getElementsByClassName("selected-footer-window")[0].classList.remove("selected-footer-window"); } catch{ }

    if (el.classList.contains("selected-explorer")) {
      if (el.classList.contains("explorer-minimize")) {
        el.classList.remove("explorer-minimize");
        e.currentTarget.classList.add("selected-footer-window");
      }
      else {
        el.classList.add("explorer-minimize");
      }
    } else {
      try { document.getElementsByClassName("selected-explorer")[0].classList.remove("selected-explorer"); } catch{ }
      if (el.classList.contains("explorer-minimize")) el.classList.remove("explorer-minimize");
      el.classList.add("selected-explorer");
      e.currentTarget.classList.add("selected-footer-window");
    }

  }
  handleFooterTabs = (x) => {
    let iconPath = null;
    if (typeof x !== "undefined" && typeof x.props.type !== "undefined") {
      switch (x.props.type.toLowerCase()) {
        case "txt":
        case "text":
        case "pdf":
          iconPath = "icons/text.png";
          break;
        case "img":
          iconPath = "icons/img.png";
          break;
        case "explorer":
          iconPath = "icons/folder.png";
          break;
      }
      return (
        <li id={"footer-tab-" + x.props.uniqueKey} onClick={(e) => { this.handleFooterTabClick(e, x.props.uniqueKey) }}>
          {iconPath !== null ? <img src={require(`../../media/${iconPath}`)} /> : <img />}
          <h3 className="footer-tab-name">{x.props.name}</h3>
        </li>
      )
    }
  }
  handleDesktopBtnClick = () => {
    let x = document.getElementsByClassName("explorer");
    if (document.getElementsByClassName("selected-footer-window")[0] !== undefined) document.getElementsByClassName("selected-footer-window")[0].classList.remove("selected-footer-window");
    for (let i = 0; i < x.length; i++) {
      if (x[i].classList.contains("explorer-minimize") === false) x[i].classList.add("explorer-minimize");
    }
  }
  render() {
    return (
      <div id="Footer">
        <ul className="nav">
          <li className="nav-item">
            <img className="nav-item-icon" src={require("../.././media/icons/logo.png")} alt="Linux Mint Logo" />
            <h3 className="nav-item-text">Menu</h3>
          </li>
          <li className="nav-item">
            <img className="nav-item-icon" src={require("../.././media/icons/user-desktop.png")} alt="Desktop shortcut" onClick={this.handleDesktopBtnClick} />
          </li>
          <li className="nav-item">
            <img className="nav-item-app-icon" src={require("../.././media/icons/folder.png")} alt="Folder Logo" onClick={this.handleFolderIconClick} />
          </li>
        </ul>
        <ul className="footer-windows">

          {this.props.activeWindows.map((x) => {
            return this.handleFooterTabs(x);
          })}
        </ul>
      </div>
    );
  }
}

export default Footer;
