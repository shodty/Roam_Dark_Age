window.removeEventListener("click", runOnPage);
window.addEventListener("click", runOnPage);
function runOnPage() {
    setTimeout(iArrayer, 150)
}
function iArrayer() {
  var images = document.getElementsByClassName('rm-inline-img')
  if(images.length > 0) {
    for(let i=0; i < images.length; i++) {
      images[i].addEventListener('click', function() { iOpen(images[i]);}, false);
    }
  }
}
function iOpen(j) {
  j.style.display = 'block';
  var url = j.getAttribute('src');
  window.open(url,'Image','width=j.stylewidth,height=j.style.height,resizable=1');
}
