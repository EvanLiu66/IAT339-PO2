// this is also for the main menu for responsiveness put this on all pages.

function myFunction(){
  var shrink = document.getElementById("topnav");
  if(shrink.className === "main-navigation"){
    shrink.className +=" responsive";
  } else {
    shrink.className = "main-navigation";
  }
}
