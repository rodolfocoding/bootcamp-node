require("dotenv").config();
const express = require("express");
const router = require("./routes");
const connect = require("./config/db/mongodb");

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`Server started on port ${port}!`));

connect();
