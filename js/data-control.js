$(document).ready(function () {
    var size = 1;

    $(".container").delegate('#add-row', 'click', function (e) {
        e.preventDefault();
        var content = jQuery('#sample_table tr'),
            element = null,
            element = content.clone();
        size++;
        console.log(size);
        element.attr('id', 'task-' + size);
        element.find('.close').attr('data-id', size);
        element.appendTo('#task_table > tbody');
    });

    $(".container").delegate('button.close', 'click', function (e) {
        e.preventDefault();
        var didConfirm = confirm("Are you sure you want to delete this task?");
        if (didConfirm == true) {
            var id = jQuery(this).attr('data-id');
//            var targetDiv = jQuery(this).attr('targetDiv');
            $('#task-' + id).remove();
            return true;
        } else {
            return false;
        }
    });

});
