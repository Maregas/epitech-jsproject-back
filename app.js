require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mUser = require('./models/User');
const logger = require('./controllers/logger');
const port = 3000;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const expressWs = require('express-ws')(app);

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(require('./routes/free/api'));

const chatrooms = {};

const wsClients = expressWs.getWss('/chatroom/general');
app.ws('/chatroom/general', (ws, req) => {
    ws.on('message', (msg) => {
        logger.info(msg);
        logger.info(wsClients);
        wsClients.clients.forEach((client) => {
            logger.info(client);
			client.send(msg);
		});
    });
    logger.info('socket', req.testing);
});

app.ws('/chatroom:name', (ws, req) => {
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
	})
});
// app.use(require('./routes/websockets'));

app.use(async (req, res, next) => {
	const result = {
		success: false,
		error: "TOKEN",
		msg: 'No Bearer token provided.'
	};

	if (req.headers.authorization) {
		const authorization = req.headers.authorization.split(' ');
		if (authorization[0] === 'Bearer') {
			const token = authorization[1];
			if (token) {
				try {
					const decoded = await jwt.verify(token, process.env.SUPER_SECRET);
					const user = await mUser.find({
						where: {
							id: decoded.id
						}
					});
					if (user) {
						req.userId = user.dataValues.id
						req.email = user.dataValues.email;
						req.nickname = user.dataValues.nickname;
						next();
					} else {
						res.status(401).json({
							success: false,
							error: "TOKEN",
							msg: "The account link to this token does not exist anymore"
						});
					}
				} catch (error) {
					result.message = 'Failed to authenticate token.';
					res.status(401).json(result);
				}
			} else {
				res.status(401).json(result);
			}
		} else {
			res.status(401).json(result);
		}
	} else {
		res.status(401).json(result);
	}
});

app.use(require('./routes/secured/api'));

// Handle 404
app.use(function (req, res) {
	res.status(404).send('404: Page not Found');
});

// Handle 500
app.use(function (error, req, res) {
	res.status(500).send('500: Internal Server Error');
});


app.listen(port, () => {
	logger.info(`Server running on port: ${port}`);
});