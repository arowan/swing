var User = function () {
  this.x = 0;
  this.y = 0;
  this.id = Date.now();
};


(function() {
  var app, express, http, io, path, map;

  express = require('express');
  app = express();
  http = require('http').Server(app);
  io = require('socket.io')(http);
  path = require('path');


  app.use(express["static"]('public/assets'));
  app.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  // Map instantiation - for now we only have a single map, later we will have many.
  //map = new Map(32,32);

  var user, users = [];

  //var onConnection =

  io.on('connection', function(socket) {
    var address = socket.handshake.address;
    console.log('A user connected from ' + address);
    socket.emit('otherPlayers', users);

    user = new User();
    users.push(user);

    socket.user = user;
    socket.emit('connected', user);
    io.emit('addPlayer', user);

    socket.on('disconnect', function () {
      console.log('a user left');
      io.emit('removePlayer', socket.user);
      var userIndex = users.indexOf(socket.user);
      users.splice(userIndex, 1);
    });

    socket.on('move', function (data) {
      console.log('moving', data);
      if (data) {
        var user = socket.user;
        if (user) {
          user.x = data.x;
          user.y = data.y;
          console.log('this dude', user)
          io.emit('updatePlayer', user);
        }
      }
    });
  });

  http.listen(4000, function() {
    return console.log('listening on *:4000');
  });

}).call(this);