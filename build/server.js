var User = function () {
  this.x = 0;
  this.y = 0;
  this.id = Date.now();
};


(function() {
  var app, express, http, io;

  express = require('express');
  app = express();
  http = require('http').Server(app);
  io = require('socket.io')(http);
  path = require('path');
  _ = require('underscore');
  
  app.use(express["static"]('public/assets'));

  var user, users = [];

  app.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  io.on('connection', function(socket) {

    console.log('a user connected');
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