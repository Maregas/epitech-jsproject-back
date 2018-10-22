const express = require("express");
const logger = require("../controllers/logger");
const chatrooms = {0: "test", 1: "lol"};
const server = require('../controllers/server').server;
const io = require('socket.io').listen(server);

io.on("connection", function(socket) {
  logger.info("a user connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
