const PlayHistoryService = require('../services/PlayHistoryService');
const response = require('../utils/response');

class PlayHistoryController {
  static async recent(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const history = await PlayHistoryService.getRecent(limit);
      res.json(response.success({ history }));
    } catch (e) { next(e); }
  }

  static async add(req, res, next) {
    try {
      const { song } = req.body;
      await PlayHistoryService.record(song);
      res.json(response.success(null, '记录成功'));
    } catch (e) { next(e); }
  }
}

module.exports = PlayHistoryController;
