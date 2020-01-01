var inputElement = document.getElementById("upload_file");
inputElement.addEventListener("change", startRead, false);

// upload file alert
inputElement.onclick = function(e)
{
    var lodConfirm =  confirm('WARNNING: Upload file will delete the chart that you are making now.\nARE YOU SURE?');
    if (!lodConfirm)
        e.preventDefault();
}


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
            console.log(fileData);
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
