const db = require('../database/connection');
const Music = require('../models/Music');
const logger = require('../utils/logger');

class MusicDao {
  async findAll(page = 1, pageSize = 10, filters = {}) {
    try {
      let sql = 'SELECT * FROM music WHERE 1=1';
      const params = [];

      if (filters.category) {
        sql += ' AND category = ?';
        params.push(filters.category);
      }

      if (filters.artist) {
        sql += ' AND artist LIKE ?';
        params.push(`%${filters.artist}%`);
      }

      if (filters.keyword) {
        sql += ' AND (title LIKE ? OR artist LIKE ? OR album LIKE ?)';
        params.push(`%${filters.keyword}%`, `%${filters.keyword}%`, `%${filters.keyword}%`);
      }

      const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
      const [countResult] = await db.query(countSql, params);
      const total = countResult.total;

      sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(pageSize), (parseInt(page) - 1) * parseInt(pageSize));

      const rows = await db.query(sql, params);
      const musicList = rows.map(row => Music.fromDatabase(row));

      return { list: musicList, total };
    } catch (error) {
      logger.error('MusicDao.findAll error', { error: error.message });
      throw error;
    }
  }

  async findById(id) {
    try {
      const sql = 'SELECT * FROM music WHERE id = ?';
      const rows = await db.query(sql, [id]);
      return rows.length > 0 ? Music.fromDatabase(rows[0]) : null;
    } catch (error) {
      logger.error('MusicDao.findById error', { id, error: error.message });
      throw error;
    }
  }

  async create(music) {
    try {
      const sql = `INSERT INTO music (title, artist, album, duration, url, cover_url, lyrics, category, tags)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        music.title,
        music.artist,
        music.album,
        music.duration,
        music.url,
        music.cover_url,
        music.lyrics,
        music.category,
        music.tags
      ];

      const result = await db.query(sql, params);
      logger.info('创建音乐成功', { id: result.insertId, title: music.title });
      return await this.findById(result.insertId);
    } catch (error) {
      logger.error('MusicDao.create error', { error: error.message });
      throw error;
    }
  }

  async update(id, music) {
    try {
      const sql = `UPDATE music SET
                   title = ?, artist = ?, album = ?, duration = ?,
                   url = ?, cover_url = ?, lyrics = ?, category = ?, tags = ?
                   WHERE id = ?`;
      const params = [
        music.title,
        music.artist,
        music.album,
        music.duration,
        music.url,
        music.cover_url,
        music.lyrics,
        music.category,
        music.tags,
        id
      ];

      const result = await db.query(sql, params);

      if (result.affectedRows > 0) {
        logger.info('更新音乐成功', { id });
        return await this.findById(id);
      } else {
        return null;
      }
    } catch (error) {
      logger.error('MusicDao.update error', { id, error: error.message });
      throw error;
    }
  }

  async delete(id) {
    try {
      const sql = 'DELETE FROM music WHERE id = ?';
      const result = await db.query(sql, [id]);

      if (result.affectedRows > 0) {
        logger.info('删除音乐成功', { id });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error('MusicDao.delete error', { id, error: error.message });
      throw error;
    }
  }

  async incrementPlayCount(id) {
    try {
      const sql = 'UPDATE music SET play_count = play_count + 1 WHERE id = ?';
      await db.query(sql, [id]);
      return await this.findById(id);
    } catch (error) {
      logger.error('MusicDao.incrementPlayCount error', { id, error: error.message });
      throw error;
    }
  }

  async incrementLikeCount(id) {
    try {
      const sql = 'UPDATE music SET like_count = like_count + 1 WHERE id = ?';
      await db.query(sql, [id]);
      return await this.findById(id);
    } catch (error) {
      logger.error('MusicDao.incrementLikeCount error', { id, error: error.message });
      throw error;
    }
  }

  async getPopular(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      const sql = 'SELECT * FROM music ORDER BY play_count DESC LIMIT ? OFFSET ?';
      const rows = await db.query(sql, [parseInt(pageSize), offset]);

      return rows.map(row => Music.fromDatabase(row));
    } catch (error) {
      logger.error('MusicDao.getPopular error', { error: error.message });
      throw error;
    }
  }

  async getRecentlyAdded(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      const sql = 'SELECT * FROM music ORDER BY created_at DESC LIMIT ? OFFSET ?';
      const rows = await db.query(sql, [parseInt(pageSize), offset]);

      return rows.map(row => Music.fromDatabase(row));
    } catch (error) {
      logger.error('MusicDao.getRecentlyAdded error', { error: error.message });
      throw error;
    }
  }
}

module.exports = new MusicDao();
