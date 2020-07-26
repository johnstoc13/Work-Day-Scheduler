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
    
    // More variables needed
    let taskArray = [];
    let task;
    let time;
    let textArea = $(".text-body");

    // Create an array to access each time column ID and write tasks to page
    function writeTasks() {
        textArea.each(function (index) {
            $(this).val(taskArray[index]);
        })
    }

    // Get localStorage and set to a variable, then write to page
    function loadTasks() {
        let storedTasks = JSON.parse(localStorage.getItem("storedTasks"));

        if (!storedTasks) {
            taskArray = ["", "", "", "", "", "", "", "", ""];
            storedTasks = taskArray;
            localStorage.setItem("storedTasks", JSON.stringify(taskArray));
        } else {
            taskArray = storedTasks;
                }
        writeTasks();
    }

    // Event listener for save buttons
    $(".saveBtn").on("click", function () {
        task = $(this).siblings("input").val();
        time = parseInt($(this).siblings("div").attr("id"));
        taskArray[time] = task;
        localStorage.setItem("storedTasks", JSON.stringify(taskArray));
    })

    // Call function when page opens or refreshes
    setTimeColor();
    loadTasks();
    
})