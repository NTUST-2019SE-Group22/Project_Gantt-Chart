google.charts.load('current', {
    'packages': ['gantt']
});
google.charts.setOnLoadCallback(initialChart);

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

var options = {
    height: 400
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
    chart = new google.visualization.Gantt(document.getElementById('chart_div'));
}

function show()
{
    alert('yee');
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');
    data.addRows([['aa', 'aa', 'complete', null, null, daysToMilliseconds(5), 40, null]]);
    chart.draw(data, options);
    
}

