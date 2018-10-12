const express = require('express');
let router = express.Router();
const logger = require('../controllers/logger');
let expressWs = require('express-ws');
expressWs = expressWs(express());
const chatrooms = {};

const wsClients = expressWs.getWss('/chatroom/general');
router.ws('/chatroom/general', (ws, req) => {
    ws.on('message', (msg) => {
        logger.info(msg);
        wsClients.clients.forEach((client) => {
			client.send(msg);
		});
    });
    logger.info('socket', req.testing);
});

router.ws('/chatroom:name', (ws, req) => {
    const name = req.params.name;
    const room = chatrooms[name] || {
      connections: []
    };
    room.connections.push(ws);
    chatrooms[name] = room;
  
    ws.on('message', (msg) => {
      room.connections.forEach((conn) => {
        if (conn === ws) return;
        conn.send(msg);
      });
    });
});

module.exports = router;