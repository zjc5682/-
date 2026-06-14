const musicDao = require('../dao/MusicDao');
const Music = require('../models/Music');
const logger = require('../utils/logger');

class MusicService {
  async getAllMusic(page, pageSize, filters) {
    try {
      const result = await musicDao.findAll(page, pageSize, filters);
      return {
        list: result.list.map(music => music.toJSON()),
        total: result.total
      };
    } catch (error) {
      logger.error('MusicService.getAllMusic error', { error: error.message });
      throw error;
    }
  }

  async getMusicById(id) {
    try {
      const music = await musicDao.findById(id);
      if (!music) {
        return null;
      }
      return music.toJSON();
    } catch (error) {
      logger.error('MusicService.getMusicById error', { id, error: error.message });
      throw error;
    }
  }

  async createMusic(data) {
    try {
      const music = new Music(data);
      const errors = music.validate();

      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      const createdMusic = await musicDao.create(music);
      logger.info('创建音乐服务成功', { id: createdMusic.id });
      return createdMusic.toJSON();
    } catch (error) {
      logger.error('MusicService.createMusic error', { error: error.message });
      throw error;
    }
  }

  async updateMusic(id, data) {
    try {
      const existingMusic = await musicDao.findById(id);
      if (!existingMusic) {
        throw new Error('音乐不存在');
      }

      const music = new Music({ ...existingMusic.toJSON(), ...data });
      const errors = music.validate();

      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      const updatedMusic = await musicDao.update(id, music);
      if (!updatedMusic) {
        throw new Error('更新失败');
      }

      logger.info('更新音乐服务成功', { id });
      return updatedMusic.toJSON();
    } catch (error) {
      logger.error('MusicService.updateMusic error', { id, error: error.message });
      throw error;
    }
  }

  async deleteMusic(id) {
    try {
      const success = await musicDao.delete(id);
      if (!success) {
        throw new Error('音乐不存在或删除失败');
      }

      logger.info('删除音乐服务成功', { id });
      return true;
    } catch (error) {
      logger.error('MusicService.deleteMusic error', { id, error: error.message });
      throw error;
    }
  }

  async playMusic(id) {
    try {
      const music = await musicDao.incrementPlayCount(id);
      if (!music) {
        throw new Error('音乐不存在');
      }

      logger.info('播放音乐', { id, play_count: music.play_count });
      return music.toJSON();
    } catch (error) {
      logger.error('MusicService.playMusic error', { id, error: error.message });
      throw error;
    }
  }

  async likeMusic(id) {
    try {
      const music = await musicDao.incrementLikeCount(id);
      if (!music) {
        throw new Error('音乐不存在');
      }

      logger.info('点赞音乐', { id, like_count: music.like_count });
      return music.toJSON();
    } catch (error) {
      logger.error('MusicService.likeMusic error', { id, error: error.message });
      throw error;
    }
  }

  async getPopularMusic(page, pageSize) {
    try {
      const list = await musicDao.getPopular(page, pageSize);
      return list.map(music => music.toJSON());
    } catch (error) {
      logger.error('MusicService.getPopularMusic error', { error: error.message });
      throw error;
    }
  }

  async getRecentlyAddedMusic(page, pageSize) {
    try {
      const list = await musicDao.getRecentlyAdded(page, pageSize);
      return list.map(music => music.toJSON());
    } catch (error) {
      logger.error('MusicService.getRecentlyAddedMusic error', { error: error.message });
      throw error;
    }
  }
}

module.exports = new MusicService();
