document.removeEventListener ("keyup", toggleButtons);
document.addEventListener ("keyup", toggleButtons);
var toggled = false;
const enterPress = new KeyboardEvent("keydown", {
  bubbles: true, cancelable: true, keyCode: 13
});
const tabPress = new KeyboardEvent("keydown", {
      bubbles: true, cancelable: true, keyCode: 9
});
const backspacePress = new KeyboardEvent("keydown", {
  bubbles: true, cancelable: true, keyCode: 8
});
const backspacePressTwo = new KeyboardEvent("keyup", {
  bubbles: true, cancelable: true, keyCode: 8
});

function toggleButtons(zEvent) {
    if (zEvent.ctrlKey  &&  zEvent.key === "y") {
      toggled = !toggled;
      if(toggled) {
        document.addEventListener("click", findBlocks);
        window.addEventListener("click", findBlocks);
        window.addEventListener("hashchange", findBlocks);
        findBlocks();
        toggleModal('on');
      }
      else{
        document.removeEventListener("click", findBlocks);
        window.removeEventListener("click", findBlocks);
        window.removeEventListener("hashchange", findBlocks);
        toggleDisplay();
        toggleModal('off');
      }
    }
}

function findBlocks() {
  setTimeout(blockArrayer, 10)
}

function toggleDisplay() {
    var buttons = document.getElementsByClassName("buttonContainer");
    for(let i=0; i < buttons.length; i++) {
      if(!toggled) { buttons[i].style.display = "none"; }
      else { buttons[i].style.display = "flex"; }
    }
}
function blockArrayer() {
    var blocks = document.getElementsByClassName("roam-block dont-unfocus-block hoverparent");
    if(blocks.length > 0) {
      for(let i=0; i < blocks.length; i++) {
        var container = document.createElement('div');
        container.classList.add("buttonContainer");
        var blockAdder = document.createElement('div');
        blockAdder.classList.add("blockAdder");
        blockAdder.innerHTML = "<span>+</span>"
        var childAdder = document.createElement('div');
        childAdder.classList.add("childAdder");
        childAdder.innerHTML = "<span>></span>"
        var blockRemover = document.createElement('div');
        blockRemover.classList.add("blockRemover");
        blockRemover.innerHTML = "<span>x</span>"
        if(blocks[i].childNodes.length < 2) {
          if(blocks[i].nodeName == 'TEXTAREA') {
            console.log("made it");
            var newContainer = blocks[i].parentElement.insertBefore(container, blocks[i].parentElement.firstElementChild.nextSibling);
          }
          else {
            var newContainer = blocks[i].appendChild(container);
          }
          newContainer.appendChild(blockAdder);
          newContainer.appendChild(childAdder);
          newContainer.appendChild(blockRemover);
        }
      }
      addListeners();
      toggleDisplay();
    }
}

function addBlock() {
    setTimeout( keypresses, 100)
}

function addChild() {
    setTimeout( childpress, 100)
}

function removeBlock() {
  setTimeout( removepress, 100)
}

function addListeners() {
    var blockAdders = document.getElementsByClassName('blockAdder')
    var childAdders = document.getElementsByClassName('childAdder')
    var blockRemovers = document.getElementsByClassName('blockRemover')
    if(blockAdders.length > 0) {
        for(let i=0; i < blockAdders.length; i++) {
          blockAdders[i].addEventListener('mousedown', addBlock, false);
        }
    }
    if(childAdders.length > 0) {
        for(let i=0; i < childAdders.length; i++) {
          childAdders[i].addEventListener('mousedown', addChild, false);
        }
    }
    if(blockRemovers.length > 0) {
      for(let i=0; i < blockRemovers.length; i++) {
        blockRemovers[i].addEventListener('mousedown', removeBlock, false);
      }
    }
}

function keypresses() {
  var current = document.activeElement;
  var content = document.activeElement.value;
  document.activeElement.value += ' \n';
  document.activeElement.dispatchEvent(enterPress);
  setTimeout( function(){ document.activeElement.click(); }, 100);
  current.value = content;
}

function childpress() {
    var currentChild = document.activeElement;
    var contentChild = document.activeElement.value;
    document.activeElement.value += ' \n';
    document.activeElement.dispatchEvent(enterPress);
    setTimeout( function(){ document.activeElement.dispatchEvent(tabPress); }, 50);
	setTimeout( function(){ document.activeElement.click(); }, 100);
    currentChild.value = contentChild;
}

function removepress() {
  //var currentChild = document.activeElement;
  //var contentChild = document.activeElement.value;
  document.activeElement.select();
  setTimeout( function(){ document.activeElement.dispatchEvent(backspacePress); }, 50);
  setTimeout( function(){ document.activeElement.dispatchEvent(backspacePressTwo); }, 75);
  //document.activeElement.value = '';
  //setTimeout( function(){ document.activeElement.dispatchEvent(backspacePress); }, 150);
  setTimeout( function(){ document.activeElement.click(); }, 155);
}

function toggleModal(state) {
  var modal = document.createElement('div');
  modal.classList.add("modalContainer");
  modal.innerHTML = "<span>Block Controls " + state + "</span>"
  if(state == "on") {
    modal.classList.add("greenText");
  }
  document.body.appendChild(modal);
  setTimeout( function() { destroyElement(modal); }, 1000);
}

function destroyElement(elem){
  elem.classList.add("fading");
  elem.classList.add("fade-out");
  setTimeout( function() { elem.parentNode.removeChild(elem); }, 500)
}