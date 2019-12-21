$(document).ready(function () {
    /**
     *  Form data control
     *  Control from table, include add and remove row
     */

    // addRow
    // Add one row below the form table
    var size = 1;
    $(".nav").delegate('#add-row', 'click', function (e) {
        e.preventDefault();
        var content = jQuery('#sample_table tr'),
            element = null,
            element = content.clone();
        size++;
        // console.log(size);
        element.attr('id', 'task-' + size);
        element.find('.close').attr('data-id', 'task-' + size);
        element.appendTo('#task_table > tbody');
    });

    // delRow
    // Remove the row in the form table
    $(".container").delegate('button.close', 'click', function (e) {
        e.preventDefault();
        // var rows = document.getElementById("task_table").rows.length;
        // console.log(rows);
        // if (rows <= 1) {
        //     alert("Can't remove last task!!");
        //     return false;
        // }
        var didConfirm = confirm("Are you sure you want to delete this task?");
        if (didConfirm == true) {
            var id = '#' + jQuery(this).attr('data-id');
            $(id).remove();

            // delete rowdata in DataTable
            var dataRows = data.getNumberOfRows();
            for(var y = 0; y < dataRows; y++) {
                if (data.getValue(y, 0) == id) {
                    data.removeRow(y);
                    break;
                }
            }
            show();
            return true;
        }
        else {
            show();
            return false;
        }
    });
    /** ----- */

    /**
     * Validation
     * Dynamic validate the form table, if valid then sow chart
     */
    var form = document.getElementById('data-table');
    form.addEventListener('change', function(event) {
        if (form.checkValidity() === false)
            event.preventDefault();
        // SYNC
        else 
            show();
        form.classList.add('was-validated');
    }, false);

});

/**
 *  Exprot file
 *  Export JSON and image file, include jpg, png, svg
 */

// downloadJSON
// Make a link to download the showing chart in JSON file,
// that can be inport again to this system
function downloadJSON() {
    viewData = [];
    var row = -1;
    $('#task_table > tbody tr').each(function () {
        row++;
        viewData.push({});
        viewData[row]["id"] = $(this).attr('id');
        viewData[row]["taskName"] = $(this).find("input[name='taskName']").val();
        viewData[row]["resource"] = $(this).find("input[name='resource']").val();
        viewData[row]["startDay"] = $(this).find("input[name='startDay']").val();
        viewData[row]["endDay"] = $(this).find("input[name='endDay']").val();
        viewData[row]["duration"] = $(this).find("input[name='duration']").val();
        viewData[row]["complete"] = $(this).find("input[name='complete']").val();
    });

    var jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(viewData));
    var downloadJSONLink = $('#downloadJSON')[0];
    downloadJSONLink.setAttribute("href", jsonStr);
    downloadJSONLink.setAttribute("download", "download_document.json");
    downloadJSONLink.click();
}

// imageOutput
// Make links to download the showing chart in image
function imageOutput()
{
    // console.log('imgout');
    var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = DOMURL.createObjectURL(svg);
    var png, jpeg;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        png = canvas.toDataURL("image/png");
        jpeg = canvas.toDataURL("image/jpeg");
        $("#downloadJPG").attr("href", jpeg);
        $("#downloadPNG").attr("href", png);
        DOMURL.revokeObjectURL(png);
        DOMURL.revokeObjectURL(jpeg);
    };
    img.src = url;

    $("#downloadSVG").attr("href", url); 
}
/** ----- */

/**
 * Draw chart
 * Draw the chart on the page from the form table
 */

// Load google API 
google.charts.load('current', {
    'packages': ['gantt']
});
google.charts.setOnLoadCallback(initialChart);

// daysToMilliseconds
// Transfer the day to millisecond(API needed)
function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

// cahrt: the container object that API draw in
// data: the data table that store chart's tasks
var chart;
var data;

// initialChart
// Initial the data table columns and chart
function initialChart() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');
    chart = new google.visualization.Gantt(document.getElementById('chart_div'));
}

// show
// Loop search the form table and put into data table than draw
function show() {
    var i;
    var tableRows = $("#task_table > tbody > tr").length;
    var dataRows;
    // console.log('tableRows ' + tableRows);
    for (i = 1; i <= tableRows; i++) {
        var temp = '#task_table > tbody > tr:nth-child(' + i + ')';
        var taskID = '#' + $(temp).attr("id");
        var taskName = $(taskID).find('input[name="taskName"]').val();
        var resource = $(taskID).find('input[name="resource"]').val();
        var startDay = $(taskID).find('input[name="startDay"]').val();
        var endDay = $(taskID).find('input[name="endDay"]').val();
        var duration = $(taskID).find('input[name="duration"]').val();
        var complete = $(taskID).find('input[name="complete"]').val();

        // type convertion
        startDay = new Date(startDay);  // to API acceptable
        endDay = new Date(endDay);  // to API acceptable
        duration = Number(duration);    // to number
        duration = daysToMilliseconds(duration);    // to API acceptable
        complete = Number(complete);

        var newTask = true;
        dataRows = data.getNumberOfRows();
        // console.log('dataRows ' + dataRows);
        for (var y = 0; y < dataRows; y++) {
            if (data.getValue(y,0) == taskID) {
                newTask = false;
                break;
            }
        }

        if (newTask) {
            // console.log("new task");
            data.addRows([[taskID, taskName, resource, startDay, endDay, duration, complete, null]]);
        }
        else {
            // console.log("edit task");
            
            // update all attribute
            for (var y = 0; y < dataRows; y++) {
                if (data.getValue(y, 0) == taskID) {
                    data.setValue(y, 1, taskName);
                    data.setValue(y, 2, resource);
                    data.setValue(y, 3, startDay);
                    data.setValue(y, 4, endDay);
                    data.setValue(y, 5, duration);
                    data.setValue(y, 6, complete);
                }
            }
        }
    }

    var options = {
        gantt: {
            trackHeight: 45
        },
        height: 180
    };

    // dynamic calculate the showing chart height
    if ((options.gantt.trackHeight * data.getNumberOfRows() + 50) > 180)
        options.height = options.gantt.trackHeight * data.getNumberOfRows() + 50;
    
    // draw to the container
    chart.draw(data, options);

    // set the output canvas width and height
    var svgWidth = $('svg').attr("width");
    var svgHeight = $('svg').attr("height");
    $("#canvas").attr({width: svgWidth, height: svgHeight});
    $("#chart_container").addClass("bg-white box-shadow");
}
/** ----- */

/**
 * Inport file
 * Inport the JSON file to show or edit the chart
 */

// inputElement: the object of the inport link
var inputElement = document.getElementById("upload_file");
inputElement.addEventListener("change", startRead, false);

// upload file alert
inputElement.onclick = function(e)
{
    var lodConfirm =  confirm('WARNNING: Upload file will delete the chart that you are making now.\nARE YOU SURE?');
    if (!lodConfirm)
        e.preventDefault();
}

// startRead
// TODO idk how to explain
function startRead() {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
        // file type filter
        var ext = inputElement.value.match(/\.([^\.]+)$/)[1];
        var flag = false;
        switch (ext) {
            case 'json':
                // accept
                flag = true;
                break;
            default:
                alert('Please choose a JSON file');
                inputElement.value = '';
                break;
        }

        if (flag) {
            var fileData = this.result;
            fileData = JSON.parse(fileData);
            // console.log(fileData);
            
            // Clear origin table
            $('#task_table > tbody').html("");
            // Clear origin DataTable
            for(var y = 0; y < data.getNumberOfRows();) {
                data.removeRow(y);
            }

            // Append row
            for (var i = 0; i < fileData.length; i++) {
                var obj = fileData[i];
                // console.log(obj.id);
                var content = jQuery('#sample_table tr'),
                    element = null,
                    element = content.clone();
                element.attr('id', 'fileTask-' + i);
                element.find('.close').attr('data-id', 'fileTask-' + i);
                element.find("input[name='taskName']").val(obj.taskName);
                element.find("input[name='resource']").val(obj.resource);
                element.find("input[name='startDay']").val(obj.startDay);
                element.find("input[name='endDay']").val(obj.endDay);
                element.find("input[name='duration']").val(obj.duration);
                element.find("input[name='complete']").val(obj.complete);
                element.appendTo('#task_table > tbody');
            }
            show();
        }
    });
    reader.readAsText(inputElement.files.item(0));
}
/** ----- */

/**
 * Synchronization
 * Add listener on date input to synchronize the end day and duration
 */

// paddingLeft
// padding '0' before the `str` until `length`
// Used in date padding zero
function paddingLeft(str, length){
    str = String(str);  
    // console.log(str.length);
    if(str.length >= length)
        return str;
    else
        return paddingLeft("0" +str,length);
}

// Start_End_Listener
// Get what row change start or end day then sync the duration
function Start_End_Listener() {
    var tableRows = $("#task_table > tbody > tr").length;
    var taskID;

    for(var i = 1; i <= tableRows; i++) {
        var temp = '#task_table > tbody > tr:nth-child(' + i + ')';
        taskID = $(temp).attr("id");
        if (taskID == $(':focus').get(0).parentElement.parentElement.parentElement.id) {
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

// Duration_Listener
// Get what row change duration then sync the end day
function Duration_Listener()
{
    var tableRows = $("#task_table > tbody > tr").length;
    var taskID;

    for(var i = 1; i <= tableRows; i++) {
        var temp = '#task_table > tbody > tr:nth-child(' + i + ')';
        taskID = $(temp).attr("id");
        if (taskID == $(':focus').get(0).parentElement.parentElement.parentElement.id) {
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