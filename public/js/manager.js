
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
        newEmployeeButton.append("<button id='newEmployeeButton' class='btn btn-primary'>Add New Employee</button>");
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

//Timeoff Requests button

//Employee Timeclock button
$(document).on("click", "#timeclockButton", function() {
    event.preventDefault();
    
    $("#managerDisplay").empty();
    timeclockPullNames();

});

function timeclockPullNames() {
    $.get("/api/employees").then(response => {
        let employeeSelectDropdown = $("<select id=employeeSelectMenu>");

            for (i=0;i<response.length;i++) {
                let idName = response[i].id+". "+response[i].name;

                employeeSelectDropdown.append("<option value='"+response[i].id+"'>"+idName+"</option>");
            }

            

            employeeSelectDropdown.append("</select>");

        $("#managerDisplay").append(employeeSelectDropdown)
        $("#managerDisplay").append("<br><button class='btn btn-primary addedButton' id='employeeSelectGo'>Pull Timepunches</button>")
    
        $("#employeeSelectGo").on("click",function() {
            $("#timeclockTable").remove();

            let selectedId = $("#employeeSelectMenu").val()

            let timeclockTable = $("<table id='timeclockTable'>");
                timeclockTable.addClass("table table-hover employeeTable");
                timeclockTable.append("<tr>");
                    timeclockTable.append("<th>Date</th>");
                    timeclockTable.append("<th>Time In</th>");
                    timeclockTable.append("<th>Time Out</th>");
                timeclockTable.append("</tr>");

                $.get("/api/gethours/"+selectedId).then(data => {

                    if (data[0].id == undefined) {
                    timeclockTable.append("<tr>");
                        timeclockTable.append("<td>No Timepunches Found</td>");
                        timeclockTable.append("<td> </td>");
                    timeclockTable.append("</tr>");
                    }

                    else for(i=0;i<data.length;i++) {

                        timeclockTable.append("<tr>");
                            timeclockTable.append("<td>"+moment(data[i].timein, "YYYY-MM-DD HH:mm:ss").format('MM-DD-YYYY')+"</td>");
                            timeclockTable.append("<td>"+moment(data[i].timein, "YYYY-MM-DD HH:mm:ss").format('hh:mm A')+"</td>");
                            timeclockTable.append("<td>"+moment(data[i].timeout, "YYYY-MM-DD HH:mm:ss").format('hh:mm A')+"</td>");
                        timeclockTable.append("</tr>");
                    }

                    $("#managerDisplay").append(timeclockTable);
                })

            });
            
        });
    };

//Current employee roles button
$(document).on("click", "#rolesButton", function() {
    event.preventDefault();
    
    $("#managerDisplay").empty();
    let rolesTable = $("<table>");
        rolesTable.addClass("table table-hover employeeTable");
        rolesTable.append("<tr>");
            rolesTable.append("<th>Employee ID</th>");
            rolesTable.append("<th>Job Title</th>");
            rolesTable.append("<th>Date Started</th>");
            rolesTable.append("<th>Date Ended</th>");
        rolesTable.append("</tr>");

        $.get("/api/jobs/").then(response => {

            for (i=0;i<response.length;i++) {
                rolesTable.append("<tr>");
                    rolesTable.append("<td>"+response[i].id+"</td>");
                    rolesTable.append("<td>"+response[i].title+"</td>");
                    rolesTable.append("<td>"+response[i].start_date+"</td>");

                    if (response[i].end_date === null) {
                        rolesTable.append("<td>Active</td>");
                    }
                    else {
                        rolesTable.append("<td>"+response[i].end_date+"</td>");
                    }
                rolesTable.append("</tr>");
            }
        });

    $("#managerDisplay").append(rolesTable);
});