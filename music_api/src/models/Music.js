class Music {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || '';
    this.artist = data.artist || '';
    this.album = data.album || '';
    this.duration = data.duration || 0;
    this.url = data.url || '';
    this.cover_url = data.cover_url || '';
    this.lyrics = data.lyrics || '';
    this.category = data.category || '';
    this.tags = data.tags || '';
    this.play_count = data.play_count || 0;
    this.like_count = data.like_count || 0;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      artist: this.artist,
      album: this.album,
      duration: this.duration,
      url: this.url,
      cover_url: this.cover_url,
      lyrics: this.lyrics,
      category: this.category,
      tags: this.tags,
      play_count: this.play_count,
      like_count: this.like_count,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  validate() {
    const errors = [];

    if (!this.title || this.title.trim() === '') {
      errors.push('音乐标题不能为空');
    }

    if (!this.artist || this.artist.trim() === '') {
      errors.push('艺术家不能为空');
    }

    if (!this.url || this.url.trim() === '') {
      errors.push('音乐URL不能为空');
    }

    return errors;
  }

  static fromDatabase(row) {
    if (!row) return null;
    return new Music(row);
  }
}

module.exports = Music;
