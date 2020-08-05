document.addEventListener('click', createHandle)
var element = document.getElementsByClassName("roam-article")[0];

function createHandle() {
    var handle = document.createElement('div');
    handle.classList.add("div-handle");
    handle.id = "handle"
    element = document.getElementsByClassName("roam-article")[0];
    element.parentElement.appendChild(handle);
}


function makeResizableDiv() {
    element = document.getElementsByClassName("roam-article")[0];
    const resizer = document.getElementById('handle');
    resizer.addEventListener('mousedown', function(e) {
        e.preventDefault()
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
    })
    function resize(e) {
        element.style.width = e.pageX - element.getBoundingClientRect().left + 'px';
    }
    function stopResize() {
        window.removeEventListener('mousemove', resize)
    }
  }
  
makeResizableDiv()