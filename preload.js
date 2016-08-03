
// import modules
var electron = require('electron');
var shell = electron.shell;
var ipc = electron.ipcRenderer;

//inject jquery to page
window.$ = window.jQuery = require('./bootstrap/jquery.min.js');

// page data that is sent to host process
$(window).load(function() {
  console.log("loaded");
  var docData = {
    url: window.location.href,
    title: document.title,
    domain: document.domain,
  };

  //sloppy, needs more consistent detection than a timeout (DOMMutationObserver? jquery-watch?)
  setTimeout(function(){
    ipc.sendToHost("startLoad", docData);
  }, 1000);
});



// currently launching links into default browser  (need to set up ipc to send message to host process function to open IN the program)
$(document).on('click', 'a[href]', function(event) {
  event.preventDefault();
  ipc.sendToHost("clickLink", this.href);
});

$(document).on('drop',function(event){
  event.preventDefault();
  return false;
});
$(document).on('dragover',function(event){
  event.preventDefault();
  return false;
});
