google.charts.load('current', {
    'packages': ['gantt']
});
google.charts.setOnLoadCallback(initialChart);

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

var options = {
    height: 300
};
var chart;
var data;
var col = { 'Task ID' : 0, 
            'Task Name' : 1, 
            'Resource' : 2, 
            'Start Date' : 3,
            'End Date' : 4, 
            'Duration' : 5, 
            'Percent Complete' : 6, 
            'Dependencies' : 7
};

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
    var rows = $("#task_table > tbody > tr").length;
    for (i = 1; i <= rows; i++) {
    var temp = '#task_table > tbody > tr:nth-child(' + i + ')';
    var taskID = '#' + $(temp).attr("id");
    var taskName = $(taskID).find('input[name="taskName"]').val();
    var resource = $(taskID).find('input[name="resource"]').val();
    var startDay = $(taskID).find('input[name="startDay"]').val();
    var endDay = $(taskID).find('input[name="endDay"]').val();
    var duration = $(taskID).find('input[name="duration"]').val();
    var complete = $(taskID).find('input[name="complete"]').val();

    // type convertion
    startDay = new Date(startDay);  // to API cceptable
    endDay = new Date(endDay);  // to API cceptable
    duration = Number(duration);    // to number
    duration = daysToMilliseconds(duration);    // to API cceptable
    complete = Number(complete);

    data.addRows([[taskID, taskName, resource, startDay, endDay, duration, complete, null]])
    }

    chart.draw(data, options);
}

function test() {

}