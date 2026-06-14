const SongService = require('../services/SongService');
const response = require('../utils/response');

class SongController {
  static async allSongs(req, res, next) {
    try {
      const songs = await SongService.getAllSongs();
      const safeSongs = Array.isArray(songs) ? songs : (songs ? [songs] : []);
      res.json({ code: 0, message: 'success', data: { songs: safeSongs } });
    } catch (e) { next(e); }
  }

  static async latest(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const songs = await SongService.getLatestSongs(limit);
      res.json(response.success({ songs }));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = SongController;
