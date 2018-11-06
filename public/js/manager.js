

//Employee List button
$("#employeeListButton").on("click",function() {
    event.preventDefault();
    
    $("#managerDisplay").empty();        
    displayEmployees();
});
function displayEmployees() {
    let addedButtonDiv = $("<div>");
        addedButtonDiv.attr("id", "addedButtonDiv");
        addedButtonDiv.addClass("row button-grid text-center");
    let newEmployeeButton = $("<div class='col-sm-4'>");
        newEmployeeButton.append("<button id='newEmployeeButton' class='btn btn-primary'>Add New Employee</button>")
    $(addedButtonDiv).append(newEmployeeButton);
    let updateEmployeeButton = $("<div class='col-sm-4'>");
        updateEmployeeButton.append("<button id='updateEmployeeButton' class='btn btn-primary'>Update Employee</button>");
    $(addedButtonDiv).append(updateEmployeeButton);
    let removeEmployeeButton = $("<div class='col-sm-4'>");
    removeEmployeeButton.append("<button id='removeEmployeeButton' class='btn btn-primary'>Remove Employee</button>");
    $(addedButtonDiv).append(removeEmployeeButton);
    $("#managerDisplay").append(addedButtonDiv);
    let employeeTable = $("<table>");
        employeeTable.addClass("table table-hover employeeTable");
            employeeTable.append("<tr>");
                employeeTable.append("<th>Employee ID</th>");
                employeeTable.append("<th>Name</th>");
                employeeTable.append("<th>Email</th>");
                employeeTable.append("<th>Username</th>");
                employeeTable.append("<th>Start Date</th>");
                employeeTable.append("<th>End Date</th>");
            employeeTable.append("</tr>")
    $.get("/api/employees", function(response) {
        
        for (i=0;i<response.length;i++) {
                employeeTable.append("<tr>");
                    employeeTable.append("<td>"+response[i].id+"</td>");
                    employeeTable.append("<td>"+response[i].name+"</td>");
                    employeeTable.append("<td>"+response[i].email+"</td>");
                    employeeTable.append("<td>"+response[i].username+"</td>");
                    employeeTable.append("<td>"+response[i].start_date+"</td>");
                    if (response[i].end_date === null) {
                        employeeTable.append("<td>Active</td>");
                    }
                    else {
                        employeeTable.append("<td>"+response[i].end_date+"</td>");
                    }
                employeeTable.append("</tr>")
        }
    });
    $("#managerDisplay").append(employeeTable);
};

//add new employee button
$(document).on("click","#newEmployeeButton",function() {
    event.preventDefault();
    
    let newEmployeeForm = $("<div>");
        newEmployeeForm.append("<form>");
            newEmployeeForm.append("<input class='form-control' type='text' id='newName' placeholder='Name'>")
            newEmployeeForm.append("<input class='form-control' type='text' id='newUsername' placeholder='Username'>")
            newEmployeeForm.append("<input class='form-control' type='email' id='newEmail' placeholder='Email'>")
            newEmployeeForm.append("<input type='password' class='form-control' id='newPassword' placeholder='Password'>");
            newEmployeeForm.append("<button class='btn btn-primary addedButton' id='newEmployeeSubmit'>Submit</button>")
            newEmployeeForm.append("<button class='btn btn-primary addedButton' id='employeeCancel'>Cancel</button>")
        newEmployeeForm.append("</form>");
    
    $("#managerDisplay").empty();
    $("#managerDisplay").append(newEmployeeForm);
});

//New submit employee button
$(document).on("click","#newEmployeeSubmit",function() {
    event.preventDefault();
    
    let postName = $("#newName").val().trim();
    let postUsername = $("#newUsername").val().trim();
    let postEmail = $("#newEmail").val().trim();
    let postPassword = $("#newPassword").val().trim();
    let newEmployee =
        {
            name: postName,
            username: postUsername,
            email: postEmail,
            password: postPassword
        }
    $.post("/api/employees", newEmployee, function(response) {
        console.log(response);
    });
    $("#managerDisplay").empty();
    displayEmployees();
});

//Update Employee button
$(document).on("click","#updateEmployeeButton",function() {
    event.preventDefault();

    let updateEmployeeForm = $("<div>");
        updateEmployeeForm.append("<form>");
            updateEmployeeForm.append("<input class='form-control' type='text' id='employeeIdInput' placeholder='Enter the ID# of the employee you want to update'><br>")
            updateEmployeeForm.append("<input class='form-control' type='text' id='newName' placeholder='Name'>")
            updateEmployeeForm.append("<input class='form-control' type='text' id='newUsername' placeholder='Username'>")
            updateEmployeeForm.append("<input class='form-control' type='email' id='newEmail' placeholder='Email'>")
            updateEmployeeForm.append("<input type='password' class='form-control' id='newPassword' placeholder='Password'>");
            updateEmployeeForm.append("<button class='btn btn-primary addedButton' id='updateSubmit'>Submit</button>")
            updateEmployeeForm.append("<button class='btn btn-primary addedButton' id='employeeCancel'>Cancel</button>")
        updateEmployeeForm.append("</form>");

    $("#managerDisplay").empty();
    $("#managerDisplay").append(updateEmployeeForm);
});

//Update post function
$(document).on("click","#updateSubmit",function() {
    event.preventDefault();
    let postName = $("#newName").val().trim();
    let postUsername = $("#newUsername").val().trim();
    let postEmail = $("#newEmail").val().trim();
    let postPassword = $("#newPassword").val().trim();
    let selectEmployeeId = $("#employeeIdInput").val().trim();
    let updateEmployee =
        {
            id: selectEmployeeId,
            name: postName,
            username: postUsername,
            email: postEmail,
            password: postPassword
        }
    console.log(updateEmployee)
    $.post("/api/employees/update", updateEmployee, function(response) {
        console.log(response);
    });
    $("#managerDisplay").empty();
    displayEmployees();
});

//Remove Employee button
$(document).on("click","#removeEmployeeButton",function() {
    event.preventDefault();

    let removeForm = $("<div>");
        removeForm.append("<form>");
            removeForm.append("<input class='form-control' type='text' id='employeeIdInput' placeholder='Enter the ID# of the employee you want to remove'>")
            removeForm.append("<button class='btn btn-primary addedButton' id='removeSubmit'>Submit</button>")
            removeForm.append("<button class='btn btn-primary addedButton' id='employeeCancel'>Cancel</button>")
        removeForm.append("</form>");

    $("#managerDisplay").empty();
    $("#managerDisplay").append(removeForm);
});

//Remove Employee submit button
$(document).on("click","#removeSubmit",function() {
    event.preventDefault();
    let removeEmployeeId = $("#employeeIdInput").val().trim();
    let employeeIdPost = {
        id: removeEmployeeId,
    }
    $.post("/api/employees/fired", employeeIdPost, function(response) {
        console.log(response);
    });
    $("#managerDisplay").empty();
    displayEmployees();
});

//Employee Cancel button
$(document).on("click","#employeeCancel",function() {
    event.preventDefault();
    $("#managerDisplay").empty();
    displayEmployees();
});

//Payroll button
$("#payrollButton").on("click",function() {
    event.preventDefault();
    //Figure out what data will be available to display with this button.
    $("#managerDisplay").empty();
});

//Employee Timeclock button
$("#timeclockButton").on("click",function() {
    event.preventDefault();
    
    $("#managerDisplay").empty();
    let timeclockTable = $("<table>");
        timeclockTable.addClass("table table-hover managerTable");
        timeclockTable.append("<tr>");
            timeclockTable.append("<th>Employee ID</th>");
            timeclockTable.append("<th>Name</th>");
            timeclockTable.append("<th>Date</th>");
            timeclockTable.append("<th>Time In</th>");
            timeclockTable.append("<th>Time Out</th>");
        timeclockTable.append("</tr>");
    //For loop to append objects from database as a new table row
    $("#managerDisplay").append(timeclockTable);
});

//Current employee roles button
$("#rolesButton").on("click",function() {
    event.preventDefault();
    
    $("#managerDisplay").empty();
    let rolesTable = $("<table>");
        rolesTable.addClass("table table-hover managerTable");
        rolesTable.append("<tr>");
            rolesTable.append("<th>Employee ID</th>");
            rolesTable.append("<th>Name</th>");
            rolesTable.append("<th>Job Title</th>");
            rolesTable.append("<th>Job ID</th>");
            rolesTable.append("<th>Date Started</th>");
            rolesTable.append("<th>Date Ended</th>");
        rolesTable.append("</tr>");
    //For loop to append objects from database as a new table row
    $("#managerDisplay").append(rolesTable);
});

//Timeoff button

function displayTimeoff() {

    var timeoffTable = $("<table>");
    timeoffTable.addClass("table table-hover managerTable");
    timeoffTable.append("<tr>");
    timeoffTable.append("<th>Name</th>");
    timeoffTable.append("<th>Start Date</th>");
    timeoffTable.append("<th>End Date</th>");
    timeoffTable.append("<th>Approved</th>");
    timeoffTable.append("<th>Denied</th>");
    timeoffTable.append("</tr>");

    $.get("/api/requests", function(results) {
        console.log("hit client route")
        // Loops through the results array
        for (var i = 0; i < results.length; i++) {

            // Converts date
            var start_dateConverted = moment(results[i].start_date).format("MM/DD/YYYY");
            var end_dateConverted = moment(results[i].end_date).format("MM/DD/YYYY");

            timeoffTable.append("<tr>");
            timeoffTable.append("<td>" + results[i].name + "</td>");
            timeoffTable.append("<td>" + start_dateConverted + "</td>");
            timeoffTable.append("<td>" + end_dateConverted + "</td>");
            timeoffTable.append('<td><button type="button" class="btn btn-success approved" id=' + results[i].id + '>&#9989</button></td>')
            timeoffTable.append('<td><button type="button" class="btn btn-success denied" id='+ results[i].id + '>&#10060</button></td>')
            timeoffTable.append("<tr>");
        }
        console.log(results);
    })
    $("#managerDisplay").append(timeoffTable);
}

$("#timeoffButton").on("click",function() {
    console.log("timeoffButton");
    event.preventDefault();

    $("#managerDisplay").empty();
    
    displayTimeoff();
});

$(document).on("click", ".approved" ,function() {
    event.preventDefault();

    $.post("/api/confirm/"+$(this).attr("id")+"/1", function(response){

    })
    $("#managerDisplay").empty();
    displayTimeoff();
});

$(document).on("click", ".denied" ,function() {
    event.preventDefault();

    var objToSend = {id: $(this).attr("id"), answer: 0};
    $.post("/api/confirm/"+$(this).attr("id")+"/0", function(response){

    })
    $("#managerDisplay").empty();
    displayTimeoff();
});

