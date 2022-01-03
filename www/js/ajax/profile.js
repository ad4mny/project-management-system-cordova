$(document).ready(function () {
    $('#fullname').html(token.firstName + " " + token.lastName);
    $('#username').html("@" + token.username);
});