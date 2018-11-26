import React, { cloneElement } from 'react';
let randomNum = () => {
    return Math.floor(Math.random() * 256) + 1;
}
export let handleWindowClose = (e, key, currentState) => {
    //takes in previous state and unique identifier then returns the new state.
    let newWindows = currentState;
    newWindows[key] = undefined;
    return newWindows;
}
export let handleWindowOpen = (e, name, data, currentState, component, props) => {
    let newWindow = currentState;
    let newKey = randomNum();
    let newUniqueKey = name + newKey;
    if (typeof currentState[newUniqueKey] !== "undefined") {
        return handleWindowOpen(e, name, data, currentState, component, props);
    } else {
        props.key = newKey;
        props.uniqueKey = newUniqueKey;
        props.name = name;
        props.data = data;
        newWindow[newUniqueKey] = React.cloneElement(component, props);
        return newWindow;
    }
}
export let moveWindow = (e, elId, firstMoveOffset) => {
    let explorerEl = document.getElementById(elId);
    let explorerElStyle = getComputedStyle(explorerEl);
    let currentStyle = {
        x: parseFloat(explorerElStyle.getPropertyValue("left")),
        y: parseFloat(explorerElStyle.getPropertyValue("top")),
        width: parseFloat(explorerElStyle.getPropertyValue("width")),
        height: parseFloat(explorerElStyle.getPropertyValue("height")),
    }
    if (firstMoveOffset === null) return firstMoveOffset = e.pageX - currentStyle.x;
    else {
        let newX = e.pageX - firstMoveOffset;
        let newY = e.pageY;
        if (newX > 0 && currentStyle.width + newX < window.innerWidth) {
            explorerEl.style.left = newX + "px";
        }
        if (newY > 0 && currentStyle.height + newY < window.innerHeight) {
            explorerEl.style.top = newY + "px";
        }
        return null
    }
}