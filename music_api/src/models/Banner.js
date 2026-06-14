const db = require('../database/connection');

class Banner {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM banners ORDER BY sort ASC');
    return rows;
  }
}

module.exports = Banner;