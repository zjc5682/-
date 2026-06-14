const sheetService = require('../services/SheetService');
const ResponseHelper = require('../utils/response');
const Validator = require('../utils/validator');
const logger = require('../utils/logger');

class SheetController {
  async getAllSheets(req, res) {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const result = await sheetService.getAllSheets(page, pageSize);

      res.json(ResponseHelper.page(result.list, result.total, page, pageSize, '查询成功'));
    } catch (error) {
      logger.error('SheetController.getAllSheets error', { error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', 500));
    }
  }

  async getSheetById(req, res) {
    try {
      const { id } = req.params;
      const sheet = await sheetService.getSheetById(id);

      if (!sheet) {
        return res.status(404).json(ResponseHelper.notFound('歌单不存在'));
      }

      res.json(ResponseHelper.success(sheet, '查询成功'));
    } catch (error) {
      logger.error('SheetController.getSheetById error', { id: req.params.id, error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', 500));
    }
  }

  async getSheetsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, pageSize = 10 } = req.query;
      const result = await sheetService.getSheetsByUserId(userId, page, pageSize);

      res.json(ResponseHelper.page(result.list, result.total, page, pageSize, '查询成功'));
    } catch (error) {
      logger.error('SheetController.getSheetsByUserId error', { userId: req.params.userId, error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', 500));
    }
  }

  async createSheet(req, res) {
    try {
      const rules = {
        title: [{ type: 'required', message: '歌单标题' }]
      };

      const errors = Validator.validate(req.body, rules);
      if (errors.length > 0) {
        return res.status(400).json(ResponseHelper.badRequest(errors.join(', ')));
      }

      const sheet = await sheetService.createSheet(req.body);
      res.status(201).json(ResponseHelper.success(sheet, '创建成功'));
    } catch (error) {
      logger.error('SheetController.createSheet error', { error: error.message });
      res.status(500).json(ResponseHelper.error('创建失败', 500));
    }
  }

  async updateSheet(req, res) {
    try {
      const { id } = req.params;
      const sheet = await sheetService.updateSheet(id, req.body);

      res.json(ResponseHelper.success(sheet, '更新成功'));
    } catch (error) {
      logger.error('SheetController.updateSheet error', { id: req.params.id, error: error.message });

      if (error.message === '歌单不存在') {
        return res.status(404).json(ResponseHelper.notFound('歌单不存在'));
      }

      res.status(500).json(ResponseHelper.error('更新失败', 500));
    }
  }

  async deleteSheet(req, res) {
    try {
      const { id } = req.params;
      await sheetService.deleteSheet(id);

      res.json(ResponseHelper.success(null, '删除成功'));
    } catch (error) {
      logger.error('SheetController.deleteSheet error', { id: req.params.id, error: error.message });

      if (error.message === '歌单不存在或删除失败') {
        return res.status(404).json(ResponseHelper.notFound('歌单不存在'));
      }

      res.status(500).json(ResponseHelper.error('删除失败', 500));
    }
  }

  async addSongToSheet(req, res) {
    try {
      const { id } = req.params;
      const { songId } = req.body;

      const rules = {
        songId: [{ type: 'required', message: '歌曲ID' }]
      };

      const errors = Validator.validate({ songId }, rules);
      if (errors.length > 0) {
        return res.status(400).json(ResponseHelper.badRequest(errors.join(', ')));
      }

      await sheetService.addSongToSheet(id, songId);
      res.json(ResponseHelper.success(null, '添加成功'));
    } catch (error) {
      logger.error('SheetController.addSongToSheet error', {
        sheetId: req.params.id,
        songId: req.body.songId,
        error: error.message
      });

      if (error.message === '歌单不存在') {
        return res.status(404).json(ResponseHelper.notFound('歌单不存在'));
      }

      res.status(500).json(ResponseHelper.error('添加失败', 500));
    }
  }

  async removeSongFromSheet(req, res) {
    try {
      const { id, songId } = req.params;
      await sheetService.removeSongFromSheet(id, songId);

      res.json(ResponseHelper.success(null, '移除成功'));
    } catch (error) {
      logger.error('SheetController.removeSongFromSheet error', {
        sheetId: req.params.id,
        songId: req.params.songId,
        error: error.message
      });

      if (error.message === '歌曲不在歌单中') {
        return res.status(404).json(ResponseHelper.notFound('歌曲不在歌单中'));
      }

      res.status(500).json(ResponseHelper.error('移除失败', 500));
    }
  }

  async getSheetSongs(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, pageSize = 50 } = req.query;

      const songs = await sheetService.getSheetSongs(id, page, pageSize);
      res.json(ResponseHelper.success(songs, '查询成功'));
    } catch (error) {
      logger.error('SheetController.getSheetSongs error', {
        sheetId: req.params.id,
        error: error.message
      });

      if (error.message === '歌单不存在') {
        return res.status(404).json(ResponseHelper.notFound('歌单不存在'));
      }

      res.status(500).json(ResponseHelper.error('查询失败', 500));
    }
  }

  async clickSheet(req, res) {
    try {
      const { id } = req.params;
      const sheet = await sheetService.clickSheet(id);

      res.json(ResponseHelper.success(sheet, '点击成功'));
    } catch (error) {
      logger.error('SheetController.clickSheet error', { id: req.params.id, error: error.message });

      if (error.message === '歌单不存在') {
        return res.status(404).json(ResponseHelper.notFound('歌单不存在'));
      }

      res.status(500).json(ResponseHelper.error('操作失败', 500));
    }
  }

  async collectSheet(req, res) {
    try {
      const { id } = req.params;
      const sheet = await sheetService.collectSheet(id);

      res.json(ResponseHelper.success(sheet, '收藏成功'));
    } catch (error) {
      logger.error('SheetController.collectSheet error', { id: req.params.id, error: error.message });

      if (error.message === '歌单不存在') {
        return res.status(404).json(ResponseHelper.notFound('歌单不存在'));
      }

      res.status(500).json(ResponseHelper.error('操作失败', 500));
    }
  }
}

module.exports = new SheetController();
