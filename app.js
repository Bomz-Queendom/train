const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("./logger");

app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/deskplus', { useNewUrlParser: true });

var villagersRouter = require("./routers/villagers-router");
var agentsRouter = require("./routers/agents-router");
var petitionsRouter = require("./routers/petitions-router");


app.use("/villagers", villagersRouter);
app.use("/agents", agentsRouter);
app.use("/petitions", petitionsRouter);

app.get("/", (req, res) => {
    return res.send({
        error: false,
        message: "Wellcome to deskplus api."
    });
});

app.listen(3000, () => {
    console.log("listen port 3000.");
});

module.exports = app;