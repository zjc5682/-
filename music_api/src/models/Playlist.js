const db = require('../database/connection');

class Playlist {
  static async findOfficial(limit = 4) {
    const sql = 'SELECT * FROM playlists LIMIT ?';
    const [rows] = await db.query(sql, [limit]);
    return rows;
  }

  static async findById(id) {
    const sql = 'SELECT * FROM playlists WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows?.[0] || null;
  }

  static async getSongs(playlistId) {
    const sql = `SELECT s.* FROM songs s
                 JOIN playlist_songs ps ON s.id = ps.song_id
                 WHERE ps.playlist_id = ?
                 ORDER BY ps.sort`;
    const [rows] = await db.query(sql, [playlistId]);
    return rows;
  }
}

module.exports = Playlist;
