$(document).ready(function(){

    $(".clockin").on("click",function(){
        $(".contentDiv").empty();
        $.post("/api/hours",function(res){
        console.log(res);
        $(".contentDiv").append("<h2>"+res+Date()+"</h2>")
        })
    });


    $.ajax({url:"/api/currentuser",method:"GET"}).then(response=>{
        console.log(response);
        console.log(response.name);
        $(".userName").append("<h2>Welcome "+response.name+"</h2>")
    });

    $(".hoursInfo").on("click", function(){
        $(".contentDiv").empty();
        let newContent = $("<div class= 'row'>");
        let newContentCol = $("<div class = 'col-sm-6'>");
        let datePicker1 = $("<input class = 'startdate' id='datepicker1' width='276' />");
        let datePicker2 = $("<input class = 'enddate' id='datepicker2' width='276' />");
        let dateSubmit = $("<button class='btn btn-info dateSubmit'>");
        let newContentCol1 = $("<div class = 'col-sm-6'>");
        let dropdown = $("<select class='payPeriodMenu' >");
        let startDay = moment().subtract(3,"months").day("Friday").format("MM-DD-YYYY");
        console.log(startDay)
        while(moment('"'+startDay+'"').isBefore(moment())){
            dropdown.append("<option value='"+startDay+"'>"+startDay+"</option>");
          startDay = moment('"'+startDay+'"').add(7,"d").format("MM-DD-YYYY")
        };
        console.log(startDay);
        dateSubmit.append("Get hours for selected dates");
        newContentCol.append(datePicker1);
        newContentCol.append("<h4>Start Date</h4>");
        newContentCol.append(datePicker2);
        newContentCol.append("<h4>End Date</h4>");
        newContentCol.append(dateSubmit);
        newContent.append(newContentCol);
        newContentCol1.append(dropdown);
        newContent.append(newContentCol1);
        $(".contentDiv").append(newContent);


        $('#datepicker1').datepicker({
             uiLibrary: 'bootstrap4'
        });
        $('#datepicker2').datepicker({
            uiLibrary: 'bootstrap4'
        });
    })

$(document).on("change",".payPeriodMenu", function(){
    let day = $(".payPeriodMenu").val()
    $("#datepicker1").val(day)
    $("#datepicker2").val(moment(day).add(7,"d").format("MM-DD-YYYY"))
})
$(document).on("click",".dateSubmit", function(){
    let date1 = $("#datepicker1").val()
    let date2 = $("#datepicker2").val()
    let objToSend = {date1:date1,date2:date2}
    console.log(objToSend)
    $.post("/api/gethours", objToSend, function(response){
        console.log(response)
    })
})

});
