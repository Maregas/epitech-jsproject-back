const port = 3000;

const logger = require("./logger");
const express = require("express");
const app = express();
const server = app.listen(port, () => {
  logger.info("Server is launched on 3000 port");
});

module.exports = {
  app,
  server
};
