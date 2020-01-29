const express = require("express");
const router = express.Router();
const connection = require("../config/db");

const {
  getAllPlaylists,
  createPlaylist,
  getPlaylistById,
  modifyPlaylist
} = require("../sql/queries");

// ===================================================================================
// get all the playlists
// ===================================================================================
router.get("/", (req, res) => {
  connection.query(getAllPlaylists(), (error, result) => {
    if (error) {
      console.log(error);
    }

    if (result.length === 0) {
      res.json({
        flash: "No playlists were found. Please create a playlist"
      });
      return;
    }
    res.json({ payload: result });
  });
});

// ===================================================================================
// get a playlist by id
// ===================================================================================
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(getPlaylistById(id), (error, result) => {
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
// create a new playlist
// ===================================================================================
router.post("/", (req, res) => {
  connection.query(createPlaylist(), req.body, (error, outerResult) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    connection.query(
      getPlaylistById(outerResult.insertId),
      (error, innerResult) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ flash: "There was an error with the database query." });
        }
        res
          .status(200)
          .json({ payload: innerResult, flash: "New playlist added." });
      }
    );
  });
});

// ===================================================================================
// modify playlist
// ===================================================================================
router.put("/:id", (req, res) => {
  console.log("id:", req.params.id);
  const id = req.params.id;
  connection.query(modifyPlaylist(id), req.body, (error, outerResult) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    connection.query(getPlaylistById(id), (error, innerResult) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ flash: "There was an error with the database query." });
      }
      res
        .status(200)
        .json({ payload: innerResult, flash: "The playlist was updated." });
    });
  });
});

// ===================================================================================
// delete playlist
// ===================================================================================
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(deletePlaylist(id), (error, result) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    res.status(200).json({ flash: "The playlist was deleted" });
  });
});

module.exports = router;
