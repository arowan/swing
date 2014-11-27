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
  
  app.use(express["static"]('public/assets'));

  var u, users = [];

  app.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  io.on('connection', function(socket) {
    console.log('a user connected');
    // registerUser
    // send user data {x, y, id}
    u = new User();
    users.push(u);
    socket.emit('connected', u);

    socket.on('keyPress', function (data) {
      console.log(data);
    });
  });

  http.listen(4000, function() {
    return console.log('listening on *:4000');
  });

}).call(this);