var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});
var path = require('path');
//Use express to serve the main page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/play', function(req, res) {
    res.sendFile(__dirname + '/client/play.html');
});

app.get('/editor', function(req, res) {
    res.sendFile(__dirname + '/client/weltmeister.html');
});

app.use(express.static('public'));

app.use('client', express.static(__dirname + '/client'));

//Socket connection handler, print to console on connection
io.sockets.on('connection', function(socket) {
    console.log('socket connection');

    socket.on('happy', function() {
        console.log('happy');
    });
});

//Start listening on port 2000
serv.listen(2000);