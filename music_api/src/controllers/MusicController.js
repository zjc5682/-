const musicService = require('../services/MusicService');
const ResponseHelper = require('../utils/response');
const Validator = require('../utils/validator');
const logger = require('../utils/logger');

class MusicController {
  async getAllMusic(req, res) {
    try {
      const { page = 1, pageSize = 10, category, artist, keyword } = req.query;

      const filters = {};
      if (category) filters.category = category;
      if (artist) filters.artist = artist;
      if (keyword) filters.keyword = keyword;

      const result = await musicService.getAllMusic(page, pageSize, filters);

      res.json(ResponseHelper.page(result.list, result.total, page, pageSize, '查询成功'));
    } catch (error) {
      logger.error('MusicController.getAllMusic error', { error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', error.message));
    }
  }

  async getMusicById(req, res) {
    try {
      const { id } = req.params;
      const music = await musicService.getMusicById(id);

      if (!music) {
        return res.status(404).json(ResponseHelper.notFound('音乐不存在'));
      }

      res.json(ResponseHelper.success(music, '查询成功'));
    } catch (error) {
      logger.error('MusicController.getMusicById error', { id: req.params.id, error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', error.message));
    }
  }

  async createMusic(req, res) {
    try {
      const rules = {
        title: [{ type: 'required', message: '音乐标题' }],
        artist: [{ type: 'required', message: '艺术家' }],
        url: [{ type: 'required', message: '音乐URL' }]
      };

      const errors = Validator.validate(req.body, rules);
      if (errors.length > 0) {
        return res.status(400).json(ResponseHelper.badRequest(errors.join(', ')));
      }

      const music = await musicService.createMusic(req.body);
      res.status(201).json(ResponseHelper.success(music, '创建成功'));
    } catch (error) {
      logger.error('MusicController.createMusic error', { error: error.message });
      res.status(500).json(ResponseHelper.error('创建失败', error.message));
    }
  }

  async updateMusic(req, res) {
    try {
      const { id } = req.params;
      const music = await musicService.updateMusic(id, req.body);

      res.json(ResponseHelper.success(music, '更新成功'));
    } catch (error) {
      logger.error('MusicController.updateMusic error', { id: req.params.id, error: error.message });

      if (error.message === '音乐不存在') {
        return res.status(404).json(ResponseHelper.notFound('音乐不存在'));
      }

      res.status(500).json(ResponseHelper.error('更新失败', error.message));
    }
  }

  async deleteMusic(req, res) {
    try {
      const { id } = req.params;
      await musicService.deleteMusic(id);

      res.json(ResponseHelper.success(null, '删除成功'));
    } catch (error) {
      logger.error('MusicController.deleteMusic error', { id: req.params.id, error: error.message });

      if (error.message === '音乐不存在或删除失败') {
        return res.status(404).json(ResponseHelper.notFound('音乐不存在'));
      }

      res.status(500).json(ResponseHelper.error('删除失败', error.message));
    }
  }

  async playMusic(req, res) {
    try {
      const { id } = req.params;
      const music = await musicService.playMusic(id);

      res.json(ResponseHelper.success(music, '播放成功'));
    } catch (error) {
      logger.error('MusicController.playMusic error', { id: req.params.id, error: error.message });

      if (error.message === '音乐不存在') {
        return res.status(404).json(ResponseHelper.notFound('音乐不存在'));
      }

      res.status(500).json(ResponseHelper.error('播放失败', error.message));
    }
  }

  async likeMusic(req, res) {
    try {
      const { id } = req.params;
      const music = await musicService.likeMusic(id);

      res.json(ResponseHelper.success(music, '点赞成功'));
    } catch (error) {
      logger.error('MusicController.likeMusic error', { id: req.params.id, error: error.message });

      if (error.message === '音乐不存在') {
        return res.status(404).json(ResponseHelper.notFound('音乐不存在'));
      }

      res.status(500).json(ResponseHelper.error('点赞失败', error.message));
    }
  }

  async getPopularMusic(req, res) {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const musics = await musicService.getPopularMusic(page, pageSize);

      res.json(ResponseHelper.success(musics, '查询成功'));
    } catch (error) {
      logger.error('MusicController.getPopularMusic error', { error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', error.message));
    }
  }

  async getRecentlyAddedMusic(req, res) {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const musics = await musicService.getRecentlyAddedMusic(page, pageSize);

      res.json(ResponseHelper.success(musics, '查询成功'));
    } catch (error) {
      logger.error('MusicController.getRecentlyAddedMusic error', { error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', error.message));
    }
  }
}

module.exports = new MusicController();
