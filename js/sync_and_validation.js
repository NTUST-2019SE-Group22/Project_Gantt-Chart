// SYNC


// validation
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('change', function(event) {
                console.log(form.checkValidity());
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    // event.stopPropagation();
                }
                else {
                    // SYNC
                    show();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
