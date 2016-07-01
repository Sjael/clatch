

// Min/Max/Close buttons
(function () {
      var remote = require('electron').remote;
      var window = remote.BrowserWindow.getFocusedWindow();

     function init() {

          document.getElementById("mini-btn").addEventListener("click", function (e) {
               window.minimize();
          });

          document.getElementById("max-btn").addEventListener("click", function (e) {
               if(window.isMaximized() === true){
                 window.unmaximize();
               }else{
                 window.maximize();
               }
          });

          document.getElementById("x-btn").addEventListener("click", function (e) {
               window.close();
          });


     };

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init();
          }
     };
})();
