const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const bcrypt = require("bcrypt");

const {
  addUser,
  getUserById,
  addPlaylistToFavorites,
  getFavoritesByRowId,
  removeFavoriteById
} = require("../sql/queries");

// ===================================================================================
// add a user
// ===================================================================================
router.post("/", (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password } = req.body;
  // hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  console.log(hash);
  // add user to the database with the hashed password
  const user = {
    first_name,
    last_name,
    email,
    password: hash
  };

  connection.query(addUser(), user, (error, outerResult) => {
    if (error) {
      console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        return res.json({
          flash: "The email addres has already been used."
        });
      }
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }

    // return  the result
    connection.query(
      getUserById(outerResult.insertId),
      (error, innerResult) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ flash: "There was an error with the database query." });
        }
        res
          .status(200)
          .json({ payload: innerResult, flash: "User added to database." });
      }
    );
  });
});

// ===================================================================================
// get a user by id
// ===================================================================================
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(getUserById(id), (error, result) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    res.status(200).json({ payload: result });
  });
});

// ===================================================================================
// add a playlist to favorites
// ===================================================================================
router.post("/favorite", (req, res) => {
  connection.query(addPlaylistToFavorites(), req.body, (error, outerResult) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    connection.query(
      getFavoritesByRowId(outerResult.insertId),
      (error, innerResult) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ flash: "There was an error with the database query." });
        }
        res
          .status(200)
          .json({ payload: innerResult, flash: "Song added to playlist" });
      }
    );
  });
});

// ===================================================================================
// remove a playlist to favorites
// ===================================================================================
router.delete("/favorite/:id", (req, res) => {
  const id = req.params.id;
  connection.query(removeFavoriteById(id), (error, result) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    res.status(200).json({ flash: "Playlist removed from favorites" });
  });
});

module.exports = router;
