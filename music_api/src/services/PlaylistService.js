const Playlist = require('../models/Playlist');

class PlaylistService {
  static async getOfficialPlaylists() {
    return await Playlist.findOfficial(4);
  }

  static async getPlaylistDetail(id) {
    const playlist = await Playlist.findById(id);
    if (!playlist) throw new Error('歌单不存在');
    return playlist;
  }

  static async getPlaylistSongs(id) {
    return await Playlist.getSongs(id);
  }
}

module.exports = PlaylistService;
