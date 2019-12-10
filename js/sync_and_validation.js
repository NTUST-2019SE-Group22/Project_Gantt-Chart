function paddingLeft(str, length){
    str = String(str);  
    console.log(str.length);
    if(str.length >= length)
        return str;
    else
        return paddingLeft("0" +str,length);
}


(function() {
    'use strict';
    window.addEventListener('load', function() {

        // Validation
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('change', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    // event.stopPropagation();
                }
                else {
                    // SYNC
                    show();
                }
                form.classList.add('was-validated');

                // SYNC

                var tableRows = $("#task_table > tbody > tr").length;
                // console.log(tableRows);
                for (var i = 1; i <= tableRows; i++) {
                    var temp = '#task_table > tbody > tr:nth-child(' + i + ')';
                    var taskID = '#' + $(temp).attr("id");
                    // console.log(taskID);
                    var targetStartEnd = taskID + " input[name='startDay'], input[name='endDay']";
                    var targetDuration = taskID + " input[name='duration']";
                    
                    $(targetStartEnd).on("change", function (){
                        var startDay = $(taskID).find('input[name="startDay"]').val();
                        var endDay = $(taskID).find('input[name="endDay"]').val();
                        // type convertion
                        startDay = new Date(startDay);
                        endDay = new Date(endDay);
                        var duration = (endDay - startDay) / 86400000;
                        $(taskID).find('input[name="duration"]').val(duration);
                        console.log('taskID: ' + taskID + ' SE');
                    });

                    $(targetDuration).on("change", function (){
                        var startDay = $(taskID).find('input[name="startDay"]').val();
                        var duration = $(taskID).find('input[name="duration"]').val();
                        // type convertion
                        startDay = new Date(startDay);
                        duration *= 86400000;
                        var endDay = new Date(startDay.getTime() + duration);
                        var year = endDay.getUTCFullYear();
                        var month = endDay.getUTCMonth() + 1;
                        var date = endDay.getUTCDate();
                        
                        endDay = year + '-' + paddingLeft(month, 2) + '-' + paddingLeft(date, 2);
                        console.log(endDay);
                        
                        $(taskID).find('input[name="endDay"]').val(endDay);
                        console.log('taskID: ' + taskID + ' d');
                    });
                }

            }, false);
        });

        
            
    }, false);
})();
