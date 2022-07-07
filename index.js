// create the express server here
require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
server.use(morgan("dev"));
const cors = require("cors");
server.use(cors());
server.use(express.json());

const apiRouter = require("./api");
server.use("/api", apiRouter);

const { PORT = 3000 } = process.env;
const client = require("./db/client");

server.get("*", (req, res, next) => {
  res.status(404).send("not found");
});

server.use(({name, message}, req, res, next) => {
  res.status(500).send({name, message});
});

server.listen(PORT, () => {
  client.connect();
  console.log(`Listening on port http://localhost:${PORT}`);
});