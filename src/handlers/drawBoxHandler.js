let checkTouchingIcon = (icon, left, right, top, bottom) => {
    if ((icon.left > left && icon.left < right) || (icon.right < right && icon.right > left)) {
        if ((icon.top > top && icon.top < bottom) || (icon.bottom > top && icon.bottom < bottom)) return true;
    }
    return false;
}
export let drawBox = (e, isExplorer=false,elId, firstPos, iconLocations,offset={bottom:0,left:0,right:0,top:0,x:0,y:0},) => {
    //doing extreme programmer math
    let secondPos = { //will hold the currentPosition of cursor
        x: e.pageX,
        y: e.pageY
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
        if(isExplorer){
            document.getElementById(elId).getElementsByClassName("explorer-content")[0].appendChild(box);
        }else document.getElementById(elId).appendChild(box);
    } else {
        //reseting an existing box
        box.classList.remove("hideBox");
        box.style.width = "0px";
        box.style.height = "0px";
        box.style.position = "absolute";
        box.style.top = firstPos.y + "px";
        box.style.left = firstPos.x + "px";
    }

    //update box position (all the fancy stuff to translate the box)
    let left = secondPos.x < firstPos.x ? secondPos.x : firstPos.x;
    let right = secondPos.x > firstPos.x ? secondPos.x : firstPos.x;
    let top = secondPos.y < firstPos.y ? secondPos.y : firstPos.y;
    let bottom = secondPos.y > firstPos.y ? secondPos.y : firstPos.y;

    let demensions = {
        left: (left-offset.left),
        right: ((right-offset.left)-(left-offset.left)),
        top:(top-offset.top),
        bottom:((bottom-offset.top)-(top-offset.top)),
    }
    if(isExplorer){
        if(demensions.left<0){
            box.style.left = "0px";
            box.style.width = (demensions.right+demensions.left) + "px";
        }else if(right<offset.right){
            box.style.left = demensions.left + "px";
            box.style.width = demensions.right + "px";
        }else{
            box.style.left = demensions.left + "px";
            box.style.width = (offset.width-demensions.left-3)+ "px";
        }
        if(demensions.top<0){
            box.style.top = "0px";
            box.style.height = (demensions.top+demensions.bottom) +"px";
        }else if(bottom<offset.bottom){
            box.style.top = demensions.top+ "px";
            box.style.height = demensions.bottom +"px";
        }else{
            box.style.top = demensions.top+ "px";
            box.style.height = (offset.height-demensions.top-3)+"px";
        }
    }else{
        box.style.left = demensions.left + "px";
        box.style.width = demensions.right + "px";
        box.style.top = demensions.top+ "px";
        box.style.height = demensions.bottom+"px";
    }

    //check box toucing icons
    if(iconLocations.length>0){
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