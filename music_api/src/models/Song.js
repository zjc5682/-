const db = require('../database/connection');

class Song {
  static async findAll() {
    try {
      const [rows] = await db.query('SELECT * FROM songs ORDER BY id ASC');
      return rows;
    } catch (error) {
      console.error('查询所有歌曲失败:', error);
      return [];
    }
  }

  static async findLatest(limit = 10) {
    const [rows] = await db.query('SELECT * FROM songs ORDER BY id DESC LIMIT ?', [limit]);
    return rows;
  }
}

module.exports = Song;
