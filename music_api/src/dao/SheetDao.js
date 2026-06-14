const db = require('../database/connection');
const Sheet = require('../models/Sheet');
const logger = require('../utils/logger');

class SheetDao {
  async findAll(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      const countSql = 'SELECT COUNT(*) as total FROM t_sheet_list';
      const [[countRow]] = await db.query(countSql);
      const total = countRow.total;

      const sql = `SELECT id, title, icon, detail, clicks_count, collects_count, comments_count, songs_count, user_id, created, updated
                   FROM t_sheet_list ORDER BY created DESC LIMIT ? OFFSET ?`;
      const [rows] = await db.query(sql, [parseInt(pageSize), offset]);
      const sheetList = rows.map(row => Sheet.fromDatabase(row));

      return { list: sheetList, total };
    } catch (error) {
      logger.error('SheetDao.findAll error', { error: error.message });
      throw error;
    }
  }

  async findById(id) {
    try {
      const sql = `SELECT id, title, icon, detail, clicks_count, collects_count, comments_count, songs_count, user_id, created, updated
                   FROM t_sheet_list WHERE id = ?`;
      const [rows] = await db.query(sql, [id]);
      return rows.length > 0 ? Sheet.fromDatabase(rows[0]) : null;
    } catch (error) {
      logger.error('SheetDao.findById error', { id, error: error.message });
      throw error;
    }
  }

  async findByUserId(userId, page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      const countSql = 'SELECT COUNT(*) as total FROM t_sheet_list WHERE user_id = ?';
      const [[countRow]] = await db.query(countSql, [userId]);
      const total = countRow.total;

      const sql = `SELECT id, title, icon, detail, clicks_count, collects_count, comments_count, songs_count, user_id, created, updated
                   FROM t_sheet_list WHERE user_id = ? ORDER BY created DESC LIMIT ? OFFSET ?`;
      const [rows] = await db.query(sql, [userId, parseInt(pageSize), offset]);
      const sheetList = rows.map(row => Sheet.fromDatabase(row));

      return { list: sheetList, total };
    } catch (error) {
      logger.error('SheetDao.findByUserId error', { userId, error: error.message });
      throw error;
    }
  }

  async create(sheet) {
    try {
      const sql = `INSERT INTO t_sheet_list (title, icon, detail, user_id)
                   VALUES (?, ?, ?, ?)`;
      const params = [
        sheet.title,
        sheet.icon,
        sheet.detail,
        sheet.user_id
      ];

      const result = await db.query(sql, params);
      logger.info('创建歌单成功', { id: result.insertId, title: sheet.title });
      return await this.findById(result.insertId);
    } catch (error) {
      logger.error('SheetDao.create error', { error: error.message });
      throw error;
    }
  }

  async update(id, sheet) {
    try {
      const sql = `UPDATE t_sheet_list SET
                   title = ?, icon = ?, detail = ?
                   WHERE id = ?`;
      const params = [
        sheet.title,
        sheet.icon,
        sheet.detail,
        id
      ];

      const result = await db.query(sql, params);

      if (result.affectedRows > 0) {
        logger.info('更新歌单成功', { id });
        return await this.findById(id);
      } else {
        return null;
      }
    } catch (error) {
      logger.error('SheetDao.update error', { id, error: error.message });
      throw error;
    }
  }

  async delete(id) {
    try {
      await db.transaction(async (connection) => {
        await connection.execute('DELETE FROM t_sheet_song WHERE sheet_id = ?', [id]);
        const [result] = await connection.execute('DELETE FROM t_sheet_list WHERE id = ?', [id]);
        return result;
      });

      logger.info('删除歌单成功', { id });
      return true;
    } catch (error) {
      logger.error('SheetDao.delete error', { id, error: error.message });
      throw error;
    }
  }

  async addSongToSheet(sheetId, songId) {
    try {
      const sql = `INSERT INTO t_sheet_song (sheet_id, song_id, position)
                   VALUES (?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM (SELECT MAX(position) as position FROM t_sheet_song WHERE sheet_id = ?) AS temp))`;
      await db.query(sql, [sheetId, songId, sheetId]);

      await db.query('UPDATE t_sheet_list SET songs_count = songs_count + 1 WHERE id = ?', [sheetId]);

      logger.info('添加歌曲到歌单', { sheetId, songId });
      return true;
    } catch (error) {
      logger.error('SheetDao.addSongToSheet error', { sheetId, songId, error: error.message });
      throw error;
    }
  }

  async removeSongFromSheet(sheetId, songId) {
    try {
      const sql = 'DELETE FROM t_sheet_song WHERE sheet_id = ? AND song_id = ?';
      const result = await db.query(sql, [sheetId, songId]);

      if (result.affectedRows > 0) {
        await db.query('UPDATE t_sheet_list SET songs_count = songs_count - 1 WHERE id = ?', [sheetId]);
        logger.info('从歌单移除歌曲', { sheetId, songId });
        return true;
      }

      return false;
    } catch (error) {
      logger.error('SheetDao.removeSongFromSheet error', { sheetId, songId, error: error.message });
      throw error;
    }
  }

  async getSheetSongs(sheetId, page = 1, pageSize = 50) {
    try {
      const offset = (page - 1) * pageSize;
      const sql = `SELECT m.*, ss.position, ss.added_at
                   FROM music m
                   INNER JOIN t_sheet_song ss ON m.id = ss.song_id
                   WHERE ss.sheet_id = ?
                   ORDER BY ss.position ASC
                   LIMIT ? OFFSET ?`;
      const [rows] = await db.query(sql, [sheetId, parseInt(pageSize), offset]);

      return rows;
    } catch (error) {
      logger.error('SheetDao.getSheetSongs error', { sheetId, error: error.message });
      throw error;
    }
  }

  async incrementClicksCount(id) {
    try {
      const sql = 'UPDATE t_sheet_list SET clicks_count = clicks_count + 1 WHERE id = ?';
      await db.query(sql, [id]);
      return await this.findById(id);
    } catch (error) {
      logger.error('SheetDao.incrementClicksCount error', { id, error: error.message });
      throw error;
    }
  }

  async incrementCollectsCount(id) {
    try {
      const sql = 'UPDATE t_sheet_list SET collects_count = collects_count + 1 WHERE id = ?';
      await db.query(sql, [id]);
      return await this.findById(id);
    } catch (error) {
      logger.error('SheetDao.incrementCollectsCount error', { id, error: error.message });
      throw error;
    }
  }

  async incrementCommentsCount(id) {
    try {
      const sql = 'UPDATE t_sheet_list SET comments_count = comments_count + 1 WHERE id = ?';
      await db.query(sql, [id]);
      return await this.findById(id);
    } catch (error) {
      logger.error('SheetDao.incrementCommentsCount error', { id, error: error.message });
      throw error;
    }
  }
}

module.exports = new SheetDao();
