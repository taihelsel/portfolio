import React, { Component } from 'react';
import './MediumIcon.css';

class MediumIcon extends Component {
  render() {
    return (
      <div className="medium-icon">
        <img src={require("../.././media/icons/folder.png")}/>
        <h3>Folder</h3>
      </div>
    );
  }
}

export default MediumIcon;
