$(document).ready(function(){

$(".clockin").on("click",function(){
  $.post("/api/hours",function(res){
    console.log(res)
  })
})







})
