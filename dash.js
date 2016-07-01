
// import modules
var fs = require('fs');
var path = require('path');
var electron = require('electron');
var shell = electron.shell;
var ipc = electron.ipcRenderer;
var electronScreen = electron.screen;
var app = electron.app;




// loading animation
var loadAni = fs.readFileSync(__dirname + '/assets/loader.html', "utf8");

var addList;
var dashCount = 0;

// loads user-set bookmarks
var marks = JSON.parse(fs.readFileSync(__dirname + '/map/marks.json', "utf8"));
var l = marks.list.length;
// loads whitelisted feeds (later to be loaded from server)
var ref = JSON.parse(fs.readFileSync(__dirname + '/map/supported.json', "utf8"));
var supported = ref.supported;

var veri = {};
veri.list = [];



// check user-set feeds to whitelist and add to new object
marks.list.forEach(function(item, i){
  var dom = item.domain;
  var pag = item.page;
  veri.list.push(ref.supported[dom].pages[pag]);
});



// loop through verified feeds
veri.list.forEach(function(item, i){
  getPage(item, i, marks.list[i].custom);
});


// add whitelisted feeds to the 'Add Feed' list
$.each(supported, function(i, item){
  var addSection = "<div class='addSite' id='addSite" + i + "'></div>";
  $('#addList').append(addSection);
  var elemi = document.getElementById("addSite" + i);
  var $elemi = $(elemi);
  $elemi.prepend("<div class='addHead' ><img id='addImg" + i + "'/><span id='addTitle" + i + "' >" + item.site + "</span></div> ");
  $('#addImg' + i).attr("src","https://www.google.com/s2/favicons?domain=" + item.icon);

  $.each(item.pages, function(j, page){
    // disable if in marks.json
    var addPage = "<div class='addPage' id='addPage" + j + "' data-domain='" + page.domain + "' data-page='" + page.name + "'>" + page.title + "</div>";
    // if custom (none at the moment)
    $elemi.append(addPage);
  })

});


// function that adds a new feeds, used on startup for bookmarked feeds and called when adding new feeds
  // 'item' is the info on the feed being loaded, structure found in supported.json
  // 'i' is the number of the feed for unique dom id's
  // 'custom' is for feeds with multiple pages using the same structure, i.e. subreddits, otherwise a blank field
function getPage(item, i, custom){

  //unique page id for dom
  var id = item.domain + item.name;

  //title setter
  if(custom === ""){
    var header = item.title;
  }else{
    var header = custom;
  }

  // DOM construction

  // add container and loading animation
  var secAdd = "<div id='c" + id + "' class='webcontain'><div class='webload'><div class='cen'>" + loadAni + "</div></div></div>";
  $(secAdd).insertBefore("#dashActHold");
  var contain = document.getElementById("c" + id);
  var $contain = $(contain);

  // webview with url and preload.js for info extraction
  var webAdd = "<webview id=web" + id + " src=" + item.url + custom + " class='dashweb' preload='./preload.js' disablewebsecurity ></webview>";
  // add feed DOM to page
  $contain.append(webAdd);
  var elemi = document.getElementById("web" + id);
  var $elemi = $(elemi);

  // add header DOM to page
  $contain.prepend("<div class='webhead' ><img id='webimg" + i + "'/><span id='webtitle" + i + "' >" + header + "</span></div> ");

  // set up message listener for page loaded
  elemi.addEventListener("ipc-message", function (e) {
    if (e.channel === "startLoad"){
      var doc = e.args[0];

      // load the pages favicon through google
      $('#webimg' + i).attr("src","https://www.google.com/s2/favicons?domain=" + doc.domain);

      // inject corresponding page's styling
      elemi.insertCSS(fs.readFileSync(__dirname + '/map/' + item.domain + '/' + item.name + '/style.css', "utf8"));
      // inject universal styling
      elemi.insertCSS(fs.readFileSync(__dirname + '/map/univ.css', "utf8"));

      // open dev tools
      //elemi.openDevTools();

      // remove loading animation
      $(elemi).siblings('.webload').remove();


      // might need to .injectJavascript() to give custom Apple-style scrollbar

    }
  });

  // increment up (since you can only add feeds at this point in development)
  dashCount++;
}

// webview in Trending tab that we can use to sign in to sites
var startup = document.getElementById("startup");
