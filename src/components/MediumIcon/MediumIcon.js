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
          this.props.handleTextDocClick(e, this.props.data.name, this.props.data.content);
          break;
        case "img":
          this.props.handleImageFileClick(e, this.props.data.name, this.props.data.content);
          break;
        case "text/pdf":
          this.props.handleFileOption(e, this.props.data.name, this.props.data.content, "View file as", ["text", "pdf"]);
          break;
        case "html":
          window.open(this.props.data.content);
          break;
        default:
          console.log("need to handle other file types");
          break;
      }
      this.setState({ clickCount: 0 });
    } else {
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
      }, 1500);
    }
    return (
      <div onClick={this.handleIconClick} className="medium-icon">
        <img src={iconImg} />
        <h3>{this.props.data.name}</h3>
      </div>
    );
  }
}

export default MediumIcon;
