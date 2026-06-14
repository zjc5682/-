const sheetDao = require('../dao/SheetDao');
const Sheet = require('../models/Sheet');
const logger = require('../utils/logger');

class SheetService {
  async getAllSheets(page, pageSize) {
    try {
      const result = await sheetDao.findAll(page, pageSize);
      return {
        list: result.list.map(sheet => sheet.toJSON()),
        total: result.total
      };
    } catch (error) {
      logger.error('SheetService.getAllSheets error', { error: error.message });
      throw error;
    }
  }

  async getSheetById(id) {
    try {
      const sheet = await sheetDao.findById(id);
      if (!sheet) {
        return null;
      }
      return sheet.toJSON();
    } catch (error) {
      logger.error('SheetService.getSheetById error', { id, error: error.message });
      throw error;
    }
  }

  async getSheetsByUserId(userId, page, pageSize) {
    try {
      const result = await sheetDao.findByUserId(userId, page, pageSize);
      return {
        list: result.list.map(sheet => sheet.toJSON()),
        total: result.total
      };
    } catch (error) {
      logger.error('SheetService.getSheetsByUserId error', { userId, error: error.message });
      throw error;
    }
  }

  async createSheet(data) {
    try {
      const sheet = new Sheet(data);
      const errors = sheet.validate();

      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      const createdSheet = await sheetDao.create(sheet);
      logger.info('创建歌单服务成功', { id: createdSheet.id });
      return createdSheet.toJSON();
    } catch (error) {
      logger.error('SheetService.createSheet error', { error: error.message });
      throw error;
    }
  }

  async updateSheet(id, data) {
    try {
      const existingSheet = await sheetDao.findById(id);
      if (!existingSheet) {
        throw new Error('歌单不存在');
      }

      const sheet = new Sheet({ ...existingSheet.toJSON(), ...data });
      const errors = sheet.validate();

      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      const updatedSheet = await sheetDao.update(id, sheet);
      if (!updatedSheet) {
        throw new Error('更新失败');
      }

      logger.info('更新歌单服务成功', { id });
      return updatedSheet.toJSON();
    } catch (error) {
      logger.error('SheetService.updateSheet error', { id, error: error.message });
      throw error;
    }
  }

  async deleteSheet(id) {
    try {
      const success = await sheetDao.delete(id);
      if (!success) {
        throw new Error('歌单不存在或删除失败');
      }

      logger.info('删除歌单服务成功', { id });
      return true;
    } catch (error) {
      logger.error('SheetService.deleteSheet error', { id, error: error.message });
      throw error;
    }
  }

  async addSongToSheet(sheetId, songId) {
    try {
      const sheet = await sheetDao.findById(sheetId);
      if (!sheet) {
        throw new Error('歌单不存在');
      }

      const success = await sheetDao.addSongToSheet(sheetId, songId);
      logger.info('添加歌曲到歌单服务成功', { sheetId, songId });
      return success;
    } catch (error) {
      logger.error('SheetService.addSongToSheet error', { sheetId, songId, error: error.message });
      throw error;
    }
  }

  async removeSongFromSheet(sheetId, songId) {
    try {
      const success = await sheetDao.removeSongFromSheet(sheetId, songId);
      if (!success) {
        throw new Error('歌曲不在歌单中');
      }

      logger.info('从歌单移除歌曲服务成功', { sheetId, songId });
      return success;
    } catch (error) {
      logger.error('SheetService.removeSongFromSheet error', { sheetId, songId, error: error.message });
      throw error;
    }
  }

  async getSheetSongs(sheetId, page, pageSize) {
    try {
      const sheet = await sheetDao.findById(sheetId);
      if (!sheet) {
        throw new Error('歌单不存在');
      }

      const songs = await sheetDao.getSheetSongs(sheetId, page, pageSize);
      return songs;
    } catch (error) {
      logger.error('SheetService.getSheetSongs error', { sheetId, error: error.message });
      throw error;
    }
  }

  async clickSheet(id) {
    try {
      const sheet = await sheetDao.incrementClicksCount(id);
      if (!sheet) {
        throw new Error('歌单不存在');
      }

      logger.info('点击歌单', { id, clicks_count: sheet.clicks_count });
      return sheet.toJSON();
    } catch (error) {
      logger.error('SheetService.clickSheet error', { id, error: error.message });
      throw error;
    }
  }

  async collectSheet(id) {
    try {
      const sheet = await sheetDao.incrementCollectsCount(id);
      if (!sheet) {
        throw new Error('歌单不存在');
      }

      logger.info('收藏歌单', { id, collects_count: sheet.collects_count });
      return sheet.toJSON();
    } catch (error) {
      logger.error('SheetService.collectSheet error', { id, error: error.message });
      throw error;
    }
  }

  async commentSheet(id) {
    try {
      const sheet = await sheetDao.incrementCommentsCount(id);
      if (!sheet) {
        throw new Error('歌单不存在');
      }

      logger.info('评论歌单', { id, comments_count: sheet.comments_count });
      return sheet.toJSON();
    } catch (error) {
      logger.error('SheetService.commentSheet error', { id, error: error.message });
      throw error;
    }
  }
}

module.exports = new SheetService();
