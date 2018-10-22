const express = require("express");
let router = express.Router();
const logger = require("../controllers/logger");
const chatrooms = {};
const server = require('../controllers/server').server;


let io = require('socket.io').listen(server);

io.on("connection", function(socket) {
  logger.info("a user connected");
});


module.exports = router;
