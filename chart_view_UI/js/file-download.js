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

function imageOutput()
{
    console.log('imgout');
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
