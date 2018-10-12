require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mUser = require('./models/User');
const logger = require('./controllers/logger');
const mRank = require("./models/Rank");
const mUserRank = require("./models/UserRank");

const app = express();
const port = 3000;
const bodyParser = require("body-parser");
require('express-ws')(app);

app.use(morgan("dev"));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.get("/test", async (req, res) => {
  res.status(200).send("Simple route work");

  await mUser.create({
    nickname: "Nitratz",
app.use(require('./routes/websockets'));
    password: "1234test"
  });

  await mRank.create({
    name: "Platine 1",
    icon_URI:
      "https://github.com/Nitratz/PulsionStats/blob/master/Ranks/rank19.png",
    GameId: 2
  });

  await mUserRank.create({
    nickname: "Nitratz",
    UserId: 2,
    RankId: 1
  });
});

app.listen(port, () => {
  logger.info(`Server running on port: ${port}`);
});
