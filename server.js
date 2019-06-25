const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static("./src/dist"));
app.post("/api", (req, res) => {
  axios
    .get(req.body.url)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(e => res.send(e));
});

app.listen(port, () => console.log("PSB listening on port " + port));
