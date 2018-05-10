$(document).ready(function() {

    /* Show/hide password in the login form */
    $('.fa-eye').click(function() {
        let passField = $('#password');
        if(passField.attr("type") == "password") {
            passField.attr("type", "text");
            return
        }
        passField.attr("type", "password");
    });

});