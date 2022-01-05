var token = JSON.parse(localStorage.getItem('token'));
var url = 'http://localhost/project-management-system/';
var url = 'https://flowump.000webhostapp.com';

var logout = function () {

    localStorage.clear('token');
    location.replace('index.html');

};