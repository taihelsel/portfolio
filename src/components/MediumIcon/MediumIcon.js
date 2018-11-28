import React, { Component } from 'react';
import './MediumIcon.css';

class MediumIcon extends Component {
  constructor() {
    super();
    this.state = {
      clickCount: 0,
    }
  }
  handleIconClick = (e) => {
    if (this.state.clickCount >= 1) {
      switch (this.props.data.type) {
        case "folder":
          this.props.handleFolderClick(e, this.props.data.name, this.props.data.content);
          break;
        case "text":
          this.props.handleFileViewerOpen(e, this.props.data.name, this.props.data.content,"txt");
          break;
        case "img":
          this.props.handleFileViewerOpen(e, this.props.data.name, this.props.data.content,"img");
          break;
        case "text/pdf":
          this.props.handlePopupModal(e, this.props.data.name, this.props.data.content, "View file as", ["txt", "pdf"]);
          break;
        case "html":
          window.open(this.props.data.content);
          break;
        // default:
        //   console.log("need to handle other file types");
        //   break;
      }
      this.props.unselectAllIcons();
      this.setState({ clickCount: 0 });
    } else {
      if( e.currentTarget.classList.contains("selected-icon")===false){
        this.props.unselectAllIcons();
        e.currentTarget.classList.add("selected-icon");
      }
      let newClickCount = this.state.clickCount;
      newClickCount++;
      this.setState({
        clickCount: newClickCount
      });
    }
  }
  render() {
    let iconImg = null;
    switch (this.props.data.type) {
      case "folder":
        iconImg = require("../.././media/icons/folder.png");
        break;
      case "text":
        iconImg = require("../.././media/icons/text.png");
        break;
      case "text/pdf":
        iconImg = require("../.././media/icons/text.png");
        break;
      case "html":
        iconImg = require("../.././media/icons/html.png");
        break;
      case "img":
        iconImg = require("../.././media/icons/img.png");
        break;
      default:
        iconImg = require("../.././media/icons/folder.png");
        break;
    }
    if (this.state.clickCount > 0) {
      setTimeout(() => {
        this.setState({
          clickCount: 0,
        });
      }, 500);
    }
    return (
      <div onClick={this.handleIconClick} className="medium-icon">
        <div className="medium-icon-mask"> <img src={iconImg} /> <div className="layer-mask"/></div>
        <h3>{this.props.data.name}</h3>
      </div>
    );
  }
}

export default MediumIcon;
