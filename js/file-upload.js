var inputElement = document.getElementById("upload_file");
inputElement.addEventListener("change", startRead, false);
//inputElement.addEventListener("click", startRead, false);

function startRead() {

    var reader = new FileReader();
    reader.addEventListener('load', function () {
        data = this.result;
        data = JSON.parse(data);
        console.log(data);
        // Clear origin table
        $('#task_table > tbody').html("");

        // Append row
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            console.log(obj.id);
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
    });
    reader.readAsText(inputElement.files.item(0));

}
