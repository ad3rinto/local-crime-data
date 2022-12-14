const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const {query} = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var queryCity = req.body.cityName;
  const URL =
    "https://data.police.uk/api/crimes-at-location?date=2021-01&lat=51.1124&lng=-0.4348";

  https.get(URL, function(response) {
    response.on("data", function(data) {
      try {
        const crimeData = JSON.parse(data);
        console.log(crimeData);
        const crimeCat = crimeData[0].category;
        console.log(crimeCat);

        res.send(
          `<h1>The main crime category in your area is  ${crimeCat}</h1>`
        );
      } catch (err) {
        res.send("Try again");
      }
    });
  });
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
