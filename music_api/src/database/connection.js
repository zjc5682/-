const mysql = require('mysql2/promise');
const config = require('../config');

class Database {
  constructor() {
    this.pool = null;
  }
  async initialize() {
    this.pool = mysql.createPool(config.database);
    const conn = await this.pool.getConnection();
    conn.release();
    console.log('MySQL 连接成功');
  }
  query(sql, params) {
    return this.pool.query(sql, params);
  }
}
module.exports = new Database();
