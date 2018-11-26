export let drawBox = (e,elId,firstPos) => {
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
}