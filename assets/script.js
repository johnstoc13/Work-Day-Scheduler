$(document).ready(function(){
    
    // Loop through 9 hours schedule and create elements
    // Cited:  Worked with tutor here
    for (var i = 9; i < 18; i++) {
        let $timeColumn;
        if (i < 12) {
            $timeColumn = $("<div class='col-1 time hour text-right'>").text(i + "AM").data("hour", i);    
        } else if (i == 12) {
            $timeColumn = $("<div class='col-1 time hour text-right'>").text(i + "PM").data("hour", i);    
        } else {
            $timeColumn = $("<div class='col-1 time hour text-right'>").text((i - 12) + "PM").data("hour", i);    
        }
        // Define variables
        const $scheduleRow = $("<div class='row'>");
        const $eventColumn = $("<input type='text' class='col-10 text-body event'>");
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
        $(".hour").each(function(){
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
    // Set event listeners to save buttons
    $(".saveBtn").on("click", function (event) {
        $(".text-body").each(function (currentIndex, currentEl) {
            taskArray[currentIndex] = $(currentEl).val().trim();
        });
        console.log(taskArray);
        storeTasks();
    })

    // Store tasks into localStorage
    function storeTasks() {
        localStorage.setItem("taskArray", JSON.stringify(taskArray));
    }



    
    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("taskArray"));
        if (storedTasks) {
            taskArray = storedTasks;
        } else {
            taskArray = JSON.parse(taskArray);
        }
        // Loop through and display on page
        for (var i = 0; i <taskArray.length; i++) {
            
        }
    }




    // $(".save-btn").on("click", function () {
    //     var task = $(this).parent("textArea").val();
    //     var time = $(this).siblings("div").attr("id");
    //     localStorage.setItem(time, note);
    // })



    // Call function when page opens or refreshes
    setTimeColor();
    loadTasks();

})