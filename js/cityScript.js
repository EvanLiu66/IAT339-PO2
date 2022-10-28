console.log("init")
function openStory(storyName){
  var i;
  var x = document.getElementsByClassName("story");
  for(i=0;i<x.length;i++){
    x[i].style.display="none";
  }
  document.getElementById(storyName).style.display="block";
}
