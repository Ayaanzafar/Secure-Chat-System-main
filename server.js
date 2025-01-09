const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Messenger Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    var text = 'Welcome to Chat Application'
    var message = text.split('')
    var len = message.length
    let key = 'P'
    let i = 0
    for (i = 0; i < len; i++) {
      message[i] = (String.fromCharCode((message[i].charCodeAt(0)) ^ key.charCodeAt(0)))
    }
    let final = message.join('')
    // Welcome current user
    socket.emit('message', formatMessage(botName, final));

    text = `${user.username} has joined the chat`
    message = text.split('')
    len = message.length
    key = 'P'
    i = 0
    for (i = 0; i < len; i++) {
      message[i] = (String.fromCharCode((message[i].charCodeAt(0)) ^ key.charCodeAt(0)))
    }
    final = message.join('')

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, final));

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    var text = msg
    var message = text.split('')
    var len = message.length
    let key = 'P'
    let i = 0
    for (i = 0; i < len; i++) {
      message[i] = (String.fromCharCode((message[i].charCodeAt(0)) ^ key.charCodeAt(0)))
    }
    let final = message.join('')

    io.to(user.room).emit('message', formatMessage(user.username, final));
  });
  socket.on('urlmsg', msg => {
    const user = getCurrentUser(socket.id);
    var ar = msg.split(' ');
    var url = ar[0];
    io.to(user.room).emit('urldone', formatMessage(user.username, url));
  })
  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      var text = `${user.username} has left the chat`
      var message = text.split('')
      var len = message.length
      let key = 'P'
      let i = 0
      for (i = 0; i < len; i++) {
        message[i] = (String.fromCharCode((message[i].charCodeAt(0)) ^ key.charCodeAt(0)))
      }
      let final = message.join('')
      io.to(user.room).emit(
        'message',
        formatMessage(botName, final)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
