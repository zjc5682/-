const PlaylistService = require('../services/PlaylistService');
const response = require('../utils/response');

class PlaylistController {
  static async official(req, res, next) {
    try {
      const playlists = await PlaylistService.getOfficialPlaylists();
      res.json(response.success({ playlists }));
    } catch (e) { next(e); }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params;
      const playlist = await PlaylistService.getPlaylistDetail(id);
      res.json(response.success({ playlist }));
    } catch (e) { next(e); }
  }

  static async songs(req, res, next) {
    try {
      const { id } = req.params;
      const songs = await PlaylistService.getPlaylistSongs(id);
      res.json(response.success({ songs }));
    } catch (e) { next(e); }
  }
}

module.exports = PlaylistController;
