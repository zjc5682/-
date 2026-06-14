class Sheet {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || '';
    this.icon = data.icon || '';
    this.detail = data.detail || '';
    this.clicks_count = data.clicks_count || 0;
    this.collects_count = data.collects_count || 0;
    this.comments_count = data.comments_count || 0;
    this.songs_count = data.songs_count || 0;
    this.user_id = data.user_id || null;
    this.created = data.created || null;
    this.updated = data.updated || null;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      icon: this.icon,
      detail: this.detail,
      clicksCount: this.clicks_count,
      collectsCount: this.collects_count,
      commentsCount: this.comments_count,
      songsCount: this.songs_count,
      userId: this.user_id,
      created: this.created,
      updated: this.updated
    };
  }

  validate() {
    const errors = [];

    if (!this.title || this.title.trim() === '') {
      errors.push('歌单标题不能为空');
    }

    return errors;
  }

  static fromDatabase(row) {
    if (!row) return null;
    return new Sheet(row);
  }
}

module.exports = Sheet;
