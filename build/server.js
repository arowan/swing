(function() {
  var app, express, http, io;

  express = require('express');
  app = express();
  http = require('http').Server(app);
  io = require('socket.io')(http);
  path = require('path');
  
  app.use(express["static"]('public/assets'));

  app.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  io.on('connection', function(socket) {
    return console.log('a user connected');
  });

  http.listen(4000, function() {
    return console.log('listening on *:4000');
  });

}).call(this);
