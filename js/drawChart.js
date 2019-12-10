google.charts.load('current', {
    'packages': ['gantt']
});
google.charts.setOnLoadCallback(initialChart);

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}


var chart;
var data;

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

function show()
{
    var i;
    var tableRows = $("#task_table > tbody > tr").length;
    var dataRows;
    // alert('tableRows ' + tableRows);
    for (i = 1; i <= tableRows; i++) 
    {
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
        // alert('dataRows ' + dataRows);
        for (var y = 0; y < dataRows; y++)
        {
            if (data.getValue(y,0) == taskID)
            {
                newTask = false;
                break;
            }
        }

        if (newTask)
        {
            // alert("new task")
            data.addRows([[taskID, taskName, resource, startDay, endDay, duration, complete, null]]);
        }
        else
        {
            // alert("edit task")
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
    if ((options.gantt.trackHeight * data.getNumberOfRows() + 50) > 180)
    {
        options.height = options.gantt.trackHeight * data.getNumberOfRows() + 50;
    }
    // options.height = (() ? (options.gantt.trackHeight * data.getNumberOfRows() + 50) : 180;
    chart.draw(data, options);
    var svgWidth = $('svg').attr("width");
    var svgHeight = $('svg').attr("height");
    console.log();
    $("#canvas").attr({width: svgWidth, height: svgHeight});
}