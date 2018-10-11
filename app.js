const express = require('express');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});


const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send(200, 'Simple route work!');
});


app.listen(port, () => {
	logger.info(`Server running on port: ${port}`);
});