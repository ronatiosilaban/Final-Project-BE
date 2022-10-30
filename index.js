require("dotenv").config();
const express = require("express");

const cors = require("cors");

// import this
const http = require("http");
const { Server } = require("socket.io");

// Get routes to the variabel
const router = require("./src/routes");

const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
// const app = express();
const fs = require("fs");
const path = require("path");
const appLogStream = fs.createWriteStream(path.join(__dirname, "app.log"), {
  flags: "a",
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("combined", { stream: appLogStream }));
app.use(
  morgan(
    (tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
      ].join(" ");
    },
    { stream: appLogStream }
  )
);

// app.use(morganMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // we must define cors because our client and server have diffe
  },
});

// import socket function and call with parameter io
require("./src/socket")(io);

const port = 5000;

app.use(express.json());
app.use(cors());

// Add endpoint grouping and router
app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));

// change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`));
