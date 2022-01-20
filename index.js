const mongoclient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

mongoclient
  .connect(
    "mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )

  .then((client) => {
    console.log("Connected to database");
    const db = client.db("KanishkBdayDB");
    const title = db.collection("Wishes");
    app.set("view engine", "ejs");
    app.listen(3000, function (req, res) {
      console.log("Your server is on!");
    });

    app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html");
    });
    app.get("/wishes", function (req, res) {
      db.collection("Wishes")
        .find()
        .toArray()
        .then((result) => {
          res.render("wishes.ejs", { Wishes: result });
        })
        .catch((error) => {
          console.error(error);
        });
    });

    app.post("/wishes", function (req, res) {
      console.log(req.body);
      title
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/wishes");
        })

        .catch((error) => {
          console.error(error);
        });
    });
  });
