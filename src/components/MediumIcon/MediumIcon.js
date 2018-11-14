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
      console.log(this.state.clickCount);
      if (this.props.data.type === "folder") {
        this.props.handleClick(e, this.props.data.name, this.props.data.content);
      } else {
        console.log("need to handle other file types");
      }
      this.setState({ clickCount: 0 });
    } else {
      let newClickCount = this.state.clickCount;
      newClickCount++;
      console.log(this.state.clickCount);
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
      case "html":
        iconImg = require("../.././media/icons/html.png");
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
