const PlayHistory = require('../models/PlayHistory');

class PlayHistoryService {
  static async record(song) {
    await PlayHistory.add(song);
  }
  static async getRecent(limit) {
    return await PlayHistory.getRecent(limit);
  }
}

module.exports = PlayHistoryService;
