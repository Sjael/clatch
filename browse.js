$(document).ready(function(){

  // Dismiss button
  $('#disbar').click(function(){
    $("#browse").velocity({left:'100%'},{ duration: 400 },{easing: "ease-in-out"});
  });

  // Back button
  $('#backb').click(function(){
    $("webview.webtab.open")[0].goBack();
  });

  // Forward button
  $('#forb').click(function(){
    $("webview.webtab.open")[0].goForward();
  });

  // Forward button
  $('#refb').click(function(){
    $("webview.webtab.open")[0].reload();
  });

  var opentab = document.getElementsByClassName('webtab open')[0];
  $("webview.webtab.open").on('did-start-loading', function(){
    console.log('start load');
    if($("webview.webtab.open")[0].canGoBack()){
      console.log('back');
    };
    if($("webview.webtab.open")[0].canGoForward()){
      console.log('forward');
    };
  });

// Google search autocomplete
// http://suggestqueries.google.com/complete/search?client=chrome&q=QUERY

});
