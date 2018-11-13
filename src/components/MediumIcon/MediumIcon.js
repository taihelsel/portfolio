import React, { Component } from 'react';
import './MediumIcon.css';

class MediumIcon extends Component {
  handleIconClick = (e) =>{
    this.props.handleClick(e,this.props.data.name,this.props.data.content);
  }
  render() {
    let iconImg = null;
    switch(this.props.data.type){
      case "folder":
        iconImg =  require("../.././media/icons/folder.png");
      break;
      default:
        iconImg =  require("../.././media/icons/folder.png");
      break;
    }
    return (
      <div onClick={this.handleIconClick} className="medium-icon">
        <img src={iconImg}/>
        <h3>{this.props.data.name}</h3>
      </div>
    );
  }
}

export default MediumIcon;
