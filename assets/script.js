$(function(){
    
    // Loop through 9 hours schedule and create elements
    // Cited:  Worked with tutor here
    for (var i = 9; i < 18; i++) {
        let $timeColumn;
        if (i < 12) {
            $timeColumn = $("<div class='col-2 time hour'>").text(i + "AM").data("hour", i);    
        } else if (i == 12) {
            $timeColumn = $("<div class='col-2 time hour'>").text(i + "PM").data("hour", i);    
        } else {
            $timeColumn = $("<div class='col-2 time hour'>").text((i - 12) + "PM").data("hour", i);    
        }
        // Define variables
        const $scheduleRow = $("<div class='row'>");
        const $eventColumn = $("<input type='text' class='col-8 event'>");
        const $saveColumn = $("<button class='saveBtn fas fa-save col-2 save'>");
        $scheduleRow.append($timeColumn, $eventColumn, $saveColumn);
        $(".container").append($scheduleRow);
    }

    
    // Put current day, month, and date onto page
    $("#currentDay").append(moment().format("dddd, MMMM Do"));

    moment().hour();
    // console.log(moment().hour());

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

    // Call function when page opens or refreshes
    setTimeColor();

})