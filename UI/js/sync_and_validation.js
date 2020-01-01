function paddingLeft(str, length){
    str = String(str);  
    // console.log(str.length);
    if(str.length >= length)
        return str;
    else
        return paddingLeft("0" +str,length);
}

(function() {
    'use strict';
    window.addEventListener('load', function() {

        // Validation
        var form = document.getElementById('data-table');
        form.addEventListener('change', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                // event.stopPropagation();
            }
            else {
                // SYNC
                show();
            }
            form.classList.add('was-validated');
        }, false);
    }, false);
})();

// SYNC
function Start_End_Listener()
{
    var tableRows = $("#task_table > tbody > tr").length;
    var taskID;

    for(var i = 1; i <= tableRows; i++)
    {
        var temp = '#task_table > tbody > tr:nth-child(' + i + ')';
        taskID = $(temp).attr("id");
        if (taskID == $(':focus').get(0).parentElement.parentElement.parentElement.id)
        {
            taskID = '#' + taskID;
            break;
        }
    }

    // console.log(taskID);
    var startDay = $(taskID).find('input[name="startDay"]').val();
    var endDay = $(taskID).find('input[name="endDay"]').val();
    // type convertion
    startDay = new Date(startDay);
    endDay = new Date(endDay);
    var duration = (endDay - startDay) / 86400000;
    $(taskID).find('input[name="duration"]').val(duration);
}

function Duration_Listener()
{
    var tableRows = $("#task_table > tbody > tr").length;
    var taskID;

    for(var i = 1; i <= tableRows; i++)
    {
        var temp = '#task_table > tbody > tr:nth-child(' + i + ')';
        taskID = $(temp).attr("id");
        if (taskID == $(':focus').get(0).parentElement.parentElement.parentElement.id)
        {
            taskID = '#' + taskID;
            break;
        }
    }

    var startDay = $(taskID).find('input[name="startDay"]').val();
    var duration = $(taskID).find('input[name="duration"]').val();
    // type convertion
    startDay = new Date(startDay);
    duration *= 86400000;
    var endDay = new Date(startDay.getTime() + duration);
    var year = endDay.getUTCFullYear();
    var month = endDay.getUTCMonth() + 1;
    var date = endDay.getUTCDate();
    
    endDay = year + '-' + paddingLeft(month, 2) + '-' + paddingLeft(date, 2);
    // console.log(endDay);
    
    $(taskID).find('input[name="endDay"]').val(endDay);
    // console.log('taskID: ' + taskID + ' d');
}