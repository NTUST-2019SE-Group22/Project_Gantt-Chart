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
        console.log($(this).attr('id'));
        console.log($(this).find("input[name='taskName']").val());
        console.log($(this).find("input[name='resource']").val());
        console.log($(this).find("input[name='startDay']").val());
        console.log($(this).find("input[name='endDay']").val());
        console.log($(this).find("input[name='duration']").val());
        console.log($(this).find("input[name='complete']").val());

    });

    var jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(viewData));
    var downloadJSONLink = $('#downloadJSON')[0];
    downloadJSONLink.setAttribute("href", jsonStr);
    downloadJSONLink.setAttribute("download", "download_document.json");
    downloadJSONLink.click();

    //    var reader = new FileReader();
    //    
    //    reader.addEventListener('load', function () {
    //        data = this.result;
    //        data = JSON.parse(data);
    //        console.log(data);
    //        // Clear origin table
    //        $('#task_table > tbody').html("");
    //
    //        // Append row
    //        for (var i = 0; i < data.length; i++) {
    //            var obj = data[i];
    //
    //            console.log(obj.id);
    //            var content = jQuery('#sample_table tr'),
    //                element = null,
    //                element = content.clone();
    //            element.attr('id', 'fileTask-' + i);
    //            element.find('.close').attr('data-id', 'fileTask-' + i);
    //            element.find("input[name='taskName']").val(obj.taskName);
    //            element.find("input[name='resource']").val(obj.resource);
    //            element.find("input[name='startDay']").val(obj.startDay);
    //            element.find("input[name='endDay']").val(obj.endDay);
    //            element.find("input[name='duration']").val(obj.duration);
    //            element.find("input[name='complete']").val(obj.complete);
    //            element.appendTo('#task_table > tbody');
    //        }
    //    });
    //    reader.readAsText(inputElement.files.item(0));

}
