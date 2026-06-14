require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const db = require('./database/connection');
const logger = require('./utils/logger');
const ResponseHelper = require('./utils/response');
const musicRoutes = require('./routes/music');
const sheetRoutes = require('./routes/sheet');
const apiDocRoutes = require('./routes/api-doc');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const bannerRouter = require('./routes/banner');
const playlistRouter = require('./routes/playlist');
const songRouter = require('./routes/song');
const indexesRouter = require('./routes/indexes');
const historyRouter = require('./routes/history');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestLogger);
    this.app.use('/static', express.static(path.join(__dirname, '..', 'public')));
  }

  setupRoutes() {
    this.app.get('/api/health', (req, res) => {
      const healthData = {
        name: '音乐API服务',
        version: '1.0.0',
        description: '提供音乐和歌单管理的RESTful API接口',
        status: 'running',
        timestamp: new Date().toISOString(),
        endpoints: {
          health: '/api/health',
          docs: '/api/docs',
          music: '/api/music',
          sheet: '/api/sheet'
        },
        documentation: {
          overview: 'GET /api/health',
          full: 'GET /api/docs/full',
          markdown: 'GET /api/docs/markdown',
          postman: 'GET /api/docs/postman'
        }
      };

      res.json(ResponseHelper.success(healthData, '服务运行正常'));
    });

    this.app.use('/api/docs', apiDocRoutes);
    this.app.use('/api/music', musicRoutes);
    this.app.use('/api/sheet', sheetRoutes);
    this.app.use('/api', bannerRouter);
    this.app.use('/api/playlists', playlistRouter);
    this.app.use('/api/songs', songRouter);
    this.app.use('/api', indexesRouter);
    this.app.use('/api/history', historyRouter);
  }

  setupErrorHandlers() {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  async initialize() {
    try {
      await db.initialize();
      logger.info('应用程序初始化成功');
      return true;
    } catch (error) {
      logger.error('应用程序初始化失败', { error: error.message });
      throw error;
    }
  }

  async start() {
    try {
      await this.initialize();

      const server = this.app.listen(config.server.port, () => {
        logger.info(`服务器启动成功`, {
          port: config.server.port,
          env: config.server.env,
          url: `http://localhost:${config.server.port}`
        });
        console.log(`🎵 音乐API服务已启动: http://localhost:${config.server.port}`);
        console.log(`📚 API文档: http://localhost:${config.server.port}/api/health`);
        console.log(`📖 完整文档: http://localhost:${config.server.port}/api/docs/full`);
        console.log(`📝 Markdown文档: http://localhost:${config.server.port}/api/docs/markdown`);
      });

      this.setupGracefulShutdown(server);

      return server;
    } catch (error) {
      logger.error('启动服务器失败', { error: error.message });
      throw error;
    }
  }

  setupGracefulShutdown(server) {
    const shutdown = async (signal) => {
      logger.info(`收到${signal}信号，开始关闭服务器...`);

      server.close(async () => {
        logger.info('HTTP服务器已关闭');

        try {
          await db.close();
          logger.info('数据库连接已关闭');
          process.exit(0);
        } catch (error) {
          logger.error('关闭数据库连接时出错', { error: error.message });
          process.exit(1);
        }
      });

      setTimeout(() => {
        logger.error('强制关闭服务器，超时时间已到');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  }
}

module.exports = App;
