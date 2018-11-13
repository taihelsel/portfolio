import React, { Component } from 'react';
import './SettingsDropDown.css';

class SettingsDropDown extends Component {
    render() {
        return (
            <ul className="settings-dropdown">
                {this.props.data.map((item) => {
                    if (item.title && item.shortcut) {
                        return (
                            <li className="settings-dropdown-item" onClick={item.handleClick}>
                                <h3 className="settings-dropdown-title">{item.title}</h3>
                                <h3 className="settings-dropdown-shortcut">{item.shortcut}</h3>
                            </li>
                        )
                    }else{
                        return (
                            <li className="settings-dropdown-item" onClick={item.handleClick}>
                                <h3 className="settings-dropdown-title">{item.title}</h3>
                            </li>
                        )
                    }
                })}
            </ul>
        );
    }
}

export default SettingsDropDown;
