require("dotenv").config();

const app = require('./controllers/server').app;
const morgan = require("morgan");
const logger = require("./controllers/logger");
const ws = require('./routes/websockets');

const bodyParser = require("body-parser");

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(ws);

app.get("/test", async (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});
