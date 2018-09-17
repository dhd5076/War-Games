var express = require('express');
var app = express();
var serv = require('http').Server(app);
var randomstring = require("randomstring");
var io = require('socket.io')(serv);
//Use express to serve the main page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/play', function(req, res) {
    res.sendFile(__dirname + '/client/play.html');
});

app.get('/create', function(req, res) {
    res.redirect('play?gameID=' +  randomstring.generate());
});

app.get('/editor', function(req, res) {
    res.sendFile(__dirname + '/client/weltmeister.html');
});

app.use(express.static('public'));

app.use('client', express.static(__dirname + '/client'));

//Socket connection handler, print to console on connection
io.sockets.on('connection', function(socket) {
    var channel = channel;
    socket.on('joinGame', function(data) {
        channel = data.gameID;
        socket.join(channel);
        console.log('A User Joined Game:', channel);
        socket.emit('joinAccepted', randomstring.generate(4));
        
    });

    socket.on('updatePlayers', function(newInfo) {
        console.log(newInfo);
        socket.broadcast.to(channel).emit('Update', newInfo);
    });
});

//Start listening on port 2000
serv.listen(2000);