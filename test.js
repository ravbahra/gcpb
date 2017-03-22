
var express = require('express');

var app = express();


var path = require('path');


app.get('/', function (req, res) { 

    res.sendFile(path.join(__dirname+'/web/index.html'));

});

app.get('/speedtest-google-api.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/js/speedtest-google-api.js'));
});

app.get('/probe/up.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/probe/up.html'));
});

app.get('/js/main.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/js/main.js'));
});

app.get('/js/tablecontroller.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/js/tablecontroller.js'));
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(__dirname);

});