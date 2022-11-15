$(".list-one a").click(function(){
  $(this).parent.addClass("selected").siblings().removeClass("selected");
});
/*This is for templating anchor links that act like check boxes, for the new products page.
I literally forgot to add a comment*/
