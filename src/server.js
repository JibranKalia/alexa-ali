"use strict";

const express = require("express");
const app = express();
const verifier = require("alexa-verifier-middleware");
const bodyParser = require("body-parser");

const alexaRouter = require("./alexa");

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(5000, () => console.log("Example app listening on port 5000!"));

app.use("/alexa", verifier, alexaRouter);
