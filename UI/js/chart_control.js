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