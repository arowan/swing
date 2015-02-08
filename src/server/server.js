(function() {
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var path = require('path');
  var GameObject = require('../shared/gameobject.js');
  var Actor = require('../shared/actor.js');
  var GameState = require('./gamestate.js');
  var ServerPlayer = require('./serverplayer.js');
  var User = require('./user.js');

  var gameState = new GameState();

  app.use(express["static"]('public/assets'));
  app.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  });

  // Map instantiation - for now we only have a single map, later we will have many.
  //this.map = new Map(32,32);

  var onMove = function(socket, data) {

    if (data) {
      var user = socket.user;
      if (user.player) {
        // TODO: Right now we believe whatever coordinates the client sends us, this is no bueno.
        console.log("[Player Moved] Player ID: " + user.player.id + ", User ID: " + user.id + ", From: " + user.player.x + "," + user.player.y + ", To: " + data.x + "," + data.y);
        user.player.x = data.x;
        user.player.y = data.y;

        // Inform the other users about this user's move
        io.emit('updatePlayer', user.player);
      }
    }
  }

  var onConnect = function(socket) {
    var ip_address = socket.handshake.address;

    var user = gameState.addUser(ip_address);

    // Associate this user with this socket
    socket.user = user;
    console.log("[User Connected] ID: " + user.id + ", IP Address: " + ip_address);

    // Acknowledge the connection, sending the user's Player object to them.
    socket.emit('connected', user.player);

    // Inform the new user about the already connected users
    // TODO: Sending all information held about all users to all users is also no bueno.
    socket.emit('otherPlayers', gameState.allPlayers());

    // Inform the already connected users about the new user
    io.emit('addPlayer', user.player);

    socket.on('disconnect', function() {
      console.log("[User Disconnected] ID: " + socket.user.id + ", IP Address: " + socket.user.ip_address);

      // Inform the other users about the user's player leaving the game
      io.emit('removePlayer', socket.user.player);

      // Remove the user that was associated with this socket from the game
      gameState.removeUser(socket.user);
    });

    socket.on('move', function(data) {
      onMove(socket, data); // Seems like there'd be a better way to do this.
    });

  };

  io.on('connection', onConnect);

  http.listen(4000, function() {
    return console.log('Listening on *:4000');
  });

}).call(this);
