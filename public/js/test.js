$(document).ready(function(){



  $("#submit").on("click",function(){
  event.preventDefault()
  var username = $("#loginID").val()
  var password = $("#loginPassword").val()
  var send = [username, password]
  console.log(send)
  $.post("/login", send, function(data){
    console.log(data)
  })
})















})
