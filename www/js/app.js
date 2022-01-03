var token = JSON.parse(localStorage.getItem('token'));
var url = 'http://localhost/project-management-system/';

var logout = function () {

    localStorage.clear();
    location.replace('index.html');

};