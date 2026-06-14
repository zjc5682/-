const db = require('../database/connection');

class PlayHistory {
  static async add(song) {
    const sql = `INSERT INTO play_history (song_id, title, artist, url, cover) VALUES (?, ?, ?, ?, ?)`;
    await db.query(sql, [song.id, song.title, song.artist, song.url, song.cover || '']);
  }

  static async getRecent(limit = 20) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM play_history ORDER BY played_at DESC LIMIT ?',
        [limit]
      );
      return rows;
    } catch (error) {
      console.error('获取最近播放失败:', error);
      return [];
    }
  }
}

module.exports = PlayHistory;
