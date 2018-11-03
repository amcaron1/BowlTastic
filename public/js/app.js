$(document).ready(function(){

$(".clockin").on("click",function(){
  $(".contentDiv").empty()
  $.post("/api/hours",function(res){
    console.log(res)
  $(".contentDiv").append("<h2>"+res+Date()+"</h2>")
  })
})

$.ajax({url:"/api/currentuser",method:"GET"}).then(response=>{
  console.log(response.name)
  $(".userName").append("<h2>Welcome "+response.name+"</h2>")
})






})
