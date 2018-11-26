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
    }else{
        props.key = newKey;
        props.uniqueKey = newUniqueKey;
        props.name = name;
        props.data = data;
        newWindow[newUniqueKey] = React.cloneElement(component,props);
        return newWindow;
    }
}