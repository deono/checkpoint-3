const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost", // address of the server
  user: "root", // username
  password: "fLZH2m2yFg8p6AG!",
  database: "playlist_app"
});
module.exports = connection;
