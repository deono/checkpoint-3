const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// routes
app.use("/playlist", require("./routes/playlist"));
app.use("/track", require("./routes/track"));

const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) {
    console.log("There was an error starting the server: ", err);
  }
  console.log(`Hi! Checkpoint 3 server is listening on port ${port}`);
});
