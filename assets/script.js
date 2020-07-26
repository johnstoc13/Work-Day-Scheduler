$(document).ready(function(){

    // Loop through 9 hours schedule and create elements
    // Cited:  Worked with tutor here
    let $eventColumn;
    for (var i = 9; i < 18; i++) {
        let $timeColumn;
        if (i < 12) {
            $timeColumn = $("<div>").addClass("col-1 time hour text-right").attr("id", i - 9).text(i + "AM").data("hour", i);    
        } else if (i == 12) {
            $timeColumn = $("<div>").addClass("col-1 time hour text-right").attr("id", i - 9).text(i + "PM").data("hour", i); 
        } else {
            $timeColumn = $("<div>").addClass("col-1 time hour text-right").attr("id", i - 9).text((i - 12) + "PM").data("hour", i);
        }
        // Define variables
        const $scheduleRow = $("<div class='row'>");
        $eventColumn = $("<input type='text' class='col-10 text-body event'>");
        const $saveColumn = $("<button class='saveBtn fas fa-save fa-2x col-1 save'>");
        $scheduleRow.append($timeColumn, $eventColumn, $saveColumn);
        $(".container").append($scheduleRow);
    }

    // Put current day, month, and date onto page
    $("#currentDay").append(moment().format("dddd, MMMM Do"));

    // Set background colors in event columns
    // Cited:  Worked with tutor here
    function setTimeColor() {
        let currentTime = moment().hour();
        $(".hour").each(function () {
            if (currentTime < $(this).data("hour")) {
                $(this).siblings().addClass("future");
            } else if (currentTime == $(this).data("hour")) {
                $(this).siblings().addClass("present");
            } else {
                $(this).siblings().addClass("past");
            }
        })
    }
    
    let taskArray = [];
    let task;
    let time;
    let textArea = $(".text-body");

    // Create an array to access each time column ID
    // Load tasks from localStorage
    function writeTasks() {
        textArea.each(function (index) {
            console.log(taskArray[index]);
            $(this).val(taskArray[index]);
            console.log(index);
        })
    }


    console.log(taskArray);
    // get localStorage 1st and set to a variable
    // Load tasks from localStorage
    function loadTasks() {
        let storedTasks = JSON.parse(localStorage.getItem("storedTasks"));

        if (!storedTasks) {
            taskArray = ["", "", "", "", "", "", "", "", ""];
            storedTasks = taskArray;
            console.log("stored task is nullll");
            localStorage.setItem("storedTasks", JSON.stringify(taskArray));
        } else {
            taskArray = storedTasks;
            console.log("stored tasks ok!");
                }
        writeTasks();
        
        // // Loop through and display on page
        // for (var i = 0; i <taskArray.length; i++) {
        // }
    }

    
    $(".saveBtn").on("click", function () {
        task = $(this).siblings("input").val();
        time = parseInt($(this).siblings("div").attr("id"));
        console.log(task, time);
        console.log(taskArray);
        taskArray[time] = task;
        localStorage.setItem("storedTasks", JSON.stringify(taskArray));
        
        console.log("this is the save button", taskArray);
    })

    // Call function when page opens or refreshes
    setTimeColor();
    loadTasks();
    

})