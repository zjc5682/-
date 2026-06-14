const Song = require('../models/Song');

class SongService {
  static async getAllSongs() {
    return await Song.findAll();
  }

  static async getLatestSongs(limit = 10) {
    return await Song.findLatest(limit);
  }
}

module.exports = SongService;
