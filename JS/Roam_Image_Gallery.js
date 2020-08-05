window.removeEventListener("click", runOnPage);
window.addEventListener("click", runOnPage);
function runOnPage() {
    setTimeout(iArrayer, 150)
}
function iArrayer() {
  var images = document.getElementsByClassName('rm-inline-img')
  if(images.length > 0) {
    for(let i=0; i < images.length; i++) {
      images[i].addEventListener('click', function() { iOpen(images, i);}, false);
    }
  }
}
function iOpen(images, index) {
  var j = images[index];
  j.style.display = 'block';
  var url = j.getAttribute('src');
  var win = window.open("", "win", 'width=j.style.width,height=j.style.height,resizable=1');
  win.document.head.innerHTML = '<title>Hi</title></head>';
  win.document.body.innerHTML = '<img src="' + url + '" width="100%"  height="' + j.style.height +'">';
  var script = document.createElement('script');
  win.document.head.appendChild(script);
  var divTest = document.createElement('div');
  divTest.innerHTML = '<h1>testing div</h1>';
  win.document.body.appendChild(divTest);
}
