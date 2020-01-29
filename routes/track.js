const express = require("express");
const router = express.Router();
const connection = require("../config/db");

const {
  getAllTracks,
  getTrackById,
  createTrack,
  modifyTrack,
  deleteTrack
} = require("../sql/queries");

// ===================================================================================
// get all the songs
// ===================================================================================
router.get("/", (req, res) => {
  connection.query(getAllTracks(), (error, result) => {
    if (error) {
      console.log(error);
    }

    if (result.length === 0) {
      res.json({
        flash: "No songs were found. Please add some songs"
      });
      return;
    }
    res.json({ payload: result });
  });
});

// ===================================================================================
// get a song by id
// ===================================================================================
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(getTrackById(id), (error, result) => {
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
// create a new song
// ===================================================================================
router.post("/", (req, res) => {
  connection.query(createTrack(), req.body, (error, outerResult) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    connection.query(
      getTrackById(outerResult.insertId),
      (error, innerResult) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ flash: "There was an error with the database query." });
        }
        res
          .status(200)
          .json({ payload: innerResult, flash: "New song added." });
      }
    );
  });
});

// ===================================================================================
// modify song
// ===================================================================================
router.put("/:id", (req, res) => {
  console.log("id:", req.params.id);
  const id = req.params.id;
  connection.query(modifyTrack(id), req.body, (error, outerResult) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    connection.query(getTrackById(id), (error, innerResult) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ flash: "There was an error with the database query." });
      }
      res
        .status(200)
        .json({ payload: innerResult, flash: "The song was updated." });
    });
  });
});

// ===================================================================================
// delete song
// ===================================================================================
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(deleteTrack(id), (error, result) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ flash: "There was an error with the database query." });
    }
    res.status(200).json({ flash: "The song was deleted" });
  });
});

module.exports = router;
