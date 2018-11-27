let checkTouchingIcon = (icon, left, right, top, bottom) => {
    if ((icon.left > left && icon.left < right) || (icon.right < right && icon.right > left)) {
        if ((icon.top > top && icon.top < bottom) || (icon.bottom>top&&icon.bottom<bottom)) return true;
    }
    return false;
}
export let drawBox = (e, elId, firstPos, iconLocations) => {
    //doing extreme programmer math
    let secondPos = { //will hold the currentPosition of cursor
        x: e.pageX,
        y: e.pageY
    }
    let posDiff = { //difference between the starting point and current point.
        x: firstPos.x - secondPos.x,
        y: firstPos.y - secondPos.y,
    }
    let size = { //size of the box
        w: Math.abs(e.pageX - firstPos.x),
        h: Math.abs(e.pageY - firstPos.y)
    }
    let box = document.getElementById("selectBox");
    if (box === null) {
        //drawing initial box
        box = document.createElement("div");
        box.id = "selectBox";
        box.style.width = "0px";
        box.style.height = "0px";
        box.style.position = "absolute";
        box.style.top = firstPos.y + "px";
        box.style.left = firstPos.x + "px";
        document.getElementById(elId).appendChild(box);
    } else {
        //reseting an existing box
        box.classList.remove("hideBox");
        box.style.width = "0px";
        box.style.height = "0px";
        box.style.position = "absolute";
        box.style.top = firstPos.y + "px";
        box.style.left = firstPos.x + "px";
    }

    //updating box size
    box.style.width = size.w + "px";
    box.style.height = size.h + "px";
    //update box position (all the fancy stuff to translate the box)
    if (posDiff.x > 0) box.style.left = firstPos.x - posDiff.x + "px";
    else box.style.left = firstPos.x + "px";
    if (posDiff.y > 0) box.style.top = firstPos.y - posDiff.y + "px";
    else box.style.top = firstPos.y + "px";

    let left = secondPos.x < firstPos.x ? secondPos.x : firstPos.x;
    let right = secondPos.x > firstPos.x ? secondPos.x : firstPos.x;
    let top = secondPos.y < firstPos.y ? secondPos.y : firstPos.y;
    let bottom = secondPos.y > firstPos.y ? secondPos.y : firstPos.y;

    //check box toucing icons
    if(document.getElementById("selectBox").classList.contains("hideBox")===false){
        iconLocations.forEach((icon) => {
            let isTouching = checkTouchingIcon(icon, left, right, top, bottom);
            let iconEl = document.getElementById(elId).getElementsByClassName("medium-icon")[icon.index];
            if (isTouching) {
                if (iconEl.classList.contains("selected-icon") === false) {
                    iconEl.classList.add("selected-icon");
                }
            } else {
                if (iconEl.classList.contains("selected-icon")) {
                    iconEl.classList.remove("selected-icon");
                }
            }
        });
    }
}