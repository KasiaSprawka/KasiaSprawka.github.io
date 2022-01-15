

//   /////////////////////////////////

//   // Make the DIV element draggable:
// //   dragElement(document.getElementById("mydiv"));


// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:

//     //console.log(elements)
    
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; // w poziomie
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; // w pionie

    
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }



// elements = [];

// const generate = document.getElementById('generate');
// const generatedBox = document.getElementById('generated-box');
// let currentColor;

// function drawBlock() {
//     const new_block = document.createElement("div");
//     var randomColor = Math.floor(Math.random() * 16777215).toString(16);
//     new_block.innerHTML = `
//     <div id="mydiv${elements.length}" draggable="true" style="height: 100px; width: 200px; background: #${randomColor}; position:absolute;">
//      <div id="mydivheader"></div>
//     </div>
//     `;
//     generatedBox.appendChild(new_block);
//     dragElement(document.getElementById(`mydiv${elements.length}`));
//     elements.push(elements.length);

// }

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
  
    function isCollide(a, b) {
      return !(
          ((a.y + a.height) < (b.y)) ||
          (a.y > (b.y + b.height)) ||
          ((a.x + a.width) < b.x) ||
          (a.x > (b.x + b.width))
      );
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
  
      var elmnt_rect = elmnt.getBoundingClientRect();
  
      var boxes = document.getElementById('generated-box').getElementsByTagName('div');
      
      for( i=0; i < boxes.length; i++ ) {
          var box = boxes[i];
          if (box.draggable) {
              var box_rect = box.getBoundingClientRect();
              if (box.id == elmnt.id) {
                  continue;
              }
  
              if (isCollide(elmnt_rect, box_rect)) {
                  if (box_rect.left > elmnt_rect.left) {
                      elmnt.style.left = (elmnt.offsetLeft - 1) + "px";
                  }
                  if (box_rect.right < elmnt_rect.right) {
                      elmnt.style.left = (elmnt.offsetLeft + 1) + "px";
                  }
                  if (box_rect.top > elmnt_rect.top) {
                      elmnt.style.top = (elmnt.offsetTop - 1) + "px";
                  }
                  if (box_rect.bottom < elmnt_rect.bottom) {
                      elmnt.style.top = (elmnt.offsetTop + 1) + "px";
                  }
                  return;
              }
          }
      }
      
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; // w poziomie
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; // w pionie
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
  