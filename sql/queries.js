module.exports = {
  // playlist queries
  getAllPlaylists: function() {
    return "SELECT * FROM playlist";
  },
  getPlaylistById: function(id) {
    return `SELECT * FROM playlist WHERE id = ${id}`;
  },
  createPlaylist: function() {
    return "INSERT INTO playlist SET ?";
  },
  modifyPlaylist: function(id) {
    return `UPDATE playlist SET ? WHERE id = ${id}`;
  },
  deletePlaylist: function(id) {
    return `DELETE FROM playlist WHERE id = ${id}`;
  },
  // track queries
  getAllTracks: function() {
    return "SELECT * FROM track";
  },
  getTrackById: function(id) {
    return `SELECT * FROM track WHERE id = ${id}`;
  },
  createTrack: function() {
    return "INSERT INTO track SET ?";
  },
  modifyTrack: function(id) {
    return `UPDATE track SET ? WHERE id = ${id}`;
  },
  deleteTrack: function(id) {
    return `DELETE FROM track WHERE id = ${id}`;
  },
  // playlist tracks queries
  addTrackToPlaylist: function() {
    return "INSERT INTO playlist_track SET ?";
  },
  getPlaylistTrackEntryById(id) {
    return `SELECT * from playlist_track WHERE id = ${id}`;
  },
  listTracksInPlaylist: function(id) {
    return `SELECT playlist_track.id AS row_id, track.title AS track_title, track.artist, track.album_art, track.youtube_url
      FROM track 
      JOIN playlist_track on playlist_track.track_id = track.id
      WHERE playlist_track.playlist_id = ${id}`;
  },
  deleteTrackFromPlaylist: function(id) {
    return `DELETE FROM playlist_track WHERE id = ${id}`;
  }
};
