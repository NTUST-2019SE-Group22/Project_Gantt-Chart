$(document).ready(function () {
    /**
     *  data-control
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
