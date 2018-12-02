const logger = require("../controllers/logger");
const server = require('../controllers/server').server;
const io = require('socket.io').listen(server);

const chatroom = io.of('/chatroom');
chatroom.on('connection', socket => {

  socket.on('room', data => {
    logger.info(`user ${data.username} join ${data.room}`);
    socket.join(data.room);
    socket.emit('connectionMessage', `Welcome on the ${data.room} room.`);
    chatroom.in(data.room).emit('connectionMessage', `user ${data.username} join ${data.room}`)
  });

  socket.on('chat message', data => {
    chatroom.in(data.room).emit('chat message', {username: data.username, msg: data.msg });
  });

});