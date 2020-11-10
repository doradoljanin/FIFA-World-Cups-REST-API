const express = require("express");
const app = express();
const path = require("path");
const base = require("./worldcupsdata");

app.set("views", path.join(__dirname, "view"));
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.static("view"));
app.get("/table", async function (req, res) {
  var JSONfile = await base.getJSON();
  res.render("datatable.html");
});
app.get("/data", async function (req, res) {
  var JSONfile = await base.getJSON();
  //console.log(JSONfile[0].venues);
  res.send(JSONfile);
});
app.post("/venues", async function (req, res) {
  //console.log(req.body.year);
  var venues = await base.getVenues(req.body.year);
  res.json({
    venues: venues,
  });
});

app.listen(3000);