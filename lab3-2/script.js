

  /////////////////////////////////

  // Make the DIV element draggable:
//   dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



elements = [];

const generate = document.getElementById('generate');
const generatedBox = document.getElementById('generated-box');
let currentColor;

function drawBlock() {
    const para = document.createElement("div");
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    currentColor = randomColor;
    console.log(randomColor);
    para.innerHTML = `
    <div id="mydiv${elements.length}" draggable="true" style="height: 100px; width: 200px; background: #${randomColor}; position:absolute;">
     <div id="mydivheader"></div>
    </div>
    `;
    generatedBox.appendChild(para);
    dragElement(document.getElementById(`mydiv${elements.length}`));
    elements.push(elements.length);

}