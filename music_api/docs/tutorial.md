# 音乐API服务 - 完整教程文档

## 目录
- [项目概述](#项目概述)
- [项目结构](#项目结构)
- [核心依赖](#核心依赖)
- [核心设计思想](#核心设计思想)
- [快速开始](#快速开始)
- [如何添加新接口](#如何添加新接口)
- [配置说明](#配置说明)
- [常见问题](#常见问题)

---

## 项目概述

本项目是一个基于 Node.js 和 Express 框架开发的音乐管理 API 服务，采用经典的**分层架构**设计模式，提供音乐和歌单的增删改查、播放、点赞、收藏等完整功能。

### 核心特性
- 📦 **分层架构** - 清晰的 Model → DAO → Service → Controller → Route 结构
- 🗄️ **MySQL 数据库** - 使用 mysql2 库连接和操作 MySQL
- 📝 **统一响应格式** - 标准化的 API 响应结构
- 🔍 **日志系统** - 完善的请求和错误日志
- 📚 **自动生成文档** - /api/health、/api/docs 接口提供完整的 API 文档
- 🔌 **CORS 支持** - 开箱即用的跨域支持

---

## 项目结构

```
music_api/
├── index.js                  # 应用主入口文件
├── package.json              # 项目配置和依赖管理
├── package-lock.json         # 依赖版本锁定文件
├── .env.example              # 环境变量示例
├── .gitignore                # Git 忽略文件配置
├── docs/                     # 项目文档目录
│   ├── tutorial.md           # 本文档
│   └── tutorial.html         # HTML 格式文档
└── src/                      # 源代码主目录
    ├── config/               # 配置文件目录
    │   ├── index.js          # 应用基础配置
    │   ├── env.js            # 环境变量加载工具
    │   └── api-doc.js        # API 文档配置
    ├── models/               # 数据模型层 (Model Layer)
    │   ├── Music.js          # 音乐数据模型
    │   └── Sheet.js          # 歌单数据模型
    ├── dao/                  # 数据访问层 (Data Access Object)
    │   ├── MusicDao.js       # 音乐数据访问对象
    │   └── SheetDao.js       # 歌单数据访问对象
    ├── services/             # 业务逻辑层 (Service Layer)
    │   ├── MusicService.js   # 音乐业务逻辑
    │   └── SheetService.js   # 歌单业务逻辑
    ├── controllers/          # 控制器层 (Controller Layer)
    │   ├── MusicController.js # 音乐请求处理
    │   └── SheetController.js # 歌单请求处理
    ├── routes/               # 路由层 (Route Layer)
    │   ├── music.js          # 音乐路由定义
    │   ├── sheet.js          # 歌单路由定义
    │   └── api-doc.js        # API 文档路由
    ├── middleware/           # 中间件层
    │   ├── errorHandler.js   # 全局错误处理
    │   └── requestLogger.js  # 请求日志记录
    ├── utils/                # 工具函数
    │   ├── logger.js         # 日志工具
    │   ├── response.js       # 响应封装工具
    │   └── validator.js      # 参数验证工具
    ├── database/             # 数据库相关
    │   ├── connection.js     # 数据库连接管理
    │   └── init.sql          # 数据库初始化 SQL
    └── app.js                # 应用程序主类
```

---

## 核心依赖

### 主要依赖库

| 库名 | 版本 | 用途 | 说明 |
|------|------|------|------|
| express | ^5.2.1 | Web 框架 | 提供 HTTP 服务、路由、中间件等功能 |
| mysql2 | ^3.22.4 | MySQL 驱动 | 连接和操作 MySQL 数据库 |
| cors | ^2.8.6 | 跨域支持 | 允许前端跨域访问 API |

### 依赖安装

```bash
# 安装依赖
npm install

# 启动服务
npm start
```

### package.json 配置

```json
{
  "name": "music_api",
  "version": "1.0.0",
  "description": "音乐API接口服务",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "keywords": ["music", "api", "express"],
  "license": "ISC",
  "type": "commonjs"
}
```

---

## 核心设计思想

### 1. 分层架构 (Layered Architecture)

项目采用经典的五层架构：

```
请求 → Route → Controller → Service → DAO → Model → 数据库
响应 ← 响应封装 ← Controller ← Service ← DAO ← Model ← 数据库
```

**各层职责清晰**：

| 层级 | 文件目录 | 主要职责 |
|------|---------|---------|
| **Route Layer** | `src/routes/` | URL 路由定义，HTTP 方法和路径绑定 |
| **Controller Layer** | `src/controllers/` | 请求参数验证、处理、响应封装 |
| **Service Layer** | `src/services/` | 业务逻辑处理，事务管理 |
| **DAO Layer** | `src/dao/` | 数据库 CRUD 操作，SQL 语句 |
| **Model Layer** | `src/models/` | 数据结构定义，数据验证 |

### 2. 单一职责原则

每个文件、每个类、每个方法都只负责一个功能，确保代码可维护和可扩展。

### 3. 依赖倒置原则

高层模块不直接依赖低层模块，通过依赖注入降低耦合度。

### 4. 统一响应格式

所有 API 响应都遵循相同的结构：

```json
{
  "code": 0,
  "message": "success",
  "data": {},
  "timestamp": "2026-05-31T15:30:00.000Z"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | number | 响应码：0=成功，-1=通用错误，400=参数错误，401=未授权，404=不存在，500=服务器错误 |
| message | string | 响应消息 |
| data | any/null | 响应数据 |
| timestamp | string | ISO8601 格式时间戳 |

### 5. 数据流向

```
1. 用户发起 HTTP 请求
2. 请求通过 Request Logger 中间件（记录日志）
3. Route 匹配到对应的 Controller
4. Controller 验证参数 → 调用 Service
5. Service 处理业务逻辑 → 调用 DAO
6. DAO 操作数据库 → 返回数据给 Service
7. Service 处理后返回给 Controller
8. Controller 使用 ResponseHelper 封装响应
9. Response 返回给用户
```

---

## 快速开始

### 1. 数据库准备

先在 MySQL 中创建数据库和表，运行 `src/database/init.sql`：

```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS music_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE music_db;
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`，并修改数据库配置：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=你的密码
DB_NAME=music_db

# 服务器配置
PORT=3000
NODE_ENV=development
```

### 3. 启动服务

```bash
# 安装依赖
npm install

# 启动服务
npm start
```

服务启动后，访问：

```
🎵 主服务: http://localhost:3000
📚 API文档: http://localhost:3000/api/health
📖 完整文档: http://localhost:3000/api/docs/full
📝 Markdown文档: http://localhost:3000/api/docs/markdown
```

---

## 如何添加新接口

让我们以**添加“收藏”功能**为例，详细说明如何新增接口。

### 步骤 1：创建数据模型 (Model)

在 `src/models/` 下创建新的模型文件，例如 `Favorite.js`：

```javascript
// src/models/Favorite.js
class Favorite {
  constructor(data = {}) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.songId = data.songId || null;
    this.createdAt = data.createdAt || null;
  }

  validate() {
    const errors = [];
    if (!this.userId) errors.push('用户ID不能为空');
    if (!this.songId) errors.push('歌曲ID不能为空');
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      songId: this.songId,
      createdAt: this.createdAt
    };
  }

  static fromDatabase(row) {
    if (!row) return null;
    return new Favorite(row);
  }
}

module.exports = Favorite;
```

### 步骤 2：创建数据访问对象 (DAO)

在 `src/dao/` 下创建 `FavoriteDao.js`：

```javascript
// src/dao/FavoriteDao.js
const db = require('../database/connection');
const Favorite = require('../models/Favorite');
const logger = require('../utils/logger');

class FavoriteDao {
  // 获取用户的收藏列表
  async findByUserId(userId, page = 1, pageSize = 20) {
    try {
      const offset = (page - 1) * pageSize;
      const countSql = 'SELECT COUNT(*) as total FROM favorites WHERE user_id = ?';
      const [countResult] = await db.query(countSql, [userId]);
      const total = countResult.total;

      const sql = `
        SELECT f.*, m.title, m.artist, m.cover_url 
        FROM favorites f 
        INNER JOIN music m ON f.song_id = m.id 
        WHERE f.user_id = ? 
        ORDER BY f.created_at DESC 
        LIMIT ? OFFSET ?
      `;
      const rows = await db.query(sql, [userId, parseInt(pageSize), offset]);

      return { list: rows, total };
    } catch (error) {
      logger.error('FavoriteDao.findByUserId error', { userId, error: error.message });
      throw error;
    }
  }

  // 添加收藏
  async create(userId, songId) {
    try {
      const sql = 'INSERT INTO favorites (user_id, song_id) VALUES (?, ?)';
      const result = await db.query(sql, [userId, songId]);
      
      logger.info('添加收藏成功', { userId, songId, id: result.insertId });
      return this.findById(result.insertId);
    } catch (error) {
      logger.error('FavoriteDao.create error', { userId, songId, error: error.message });
      throw error;
    }
  }

  // 删除收藏
  async delete(userId, songId) {
    try {
      const sql = 'DELETE FROM favorites WHERE user_id = ? AND song_id = ?';
      const result = await db.query(sql, [userId, songId]);
      
      if (result.affectedRows > 0) {
        logger.info('删除收藏成功', { userId, songId });
        return true;
      }
      return false;
    } catch (error) {
      logger.error('FavoriteDao.delete error', { userId, songId, error: error.message });
      throw error;
    }
  }

  // 检查是否已收藏
  async isFavorited(userId, songId) {
    try {
      const sql = 'SELECT id FROM favorites WHERE user_id = ? AND song_id = ?';
      const rows = await db.query(sql, [userId, songId]);
      return rows.length > 0;
    } catch (error) {
      logger.error('FavoriteDao.isFavorited error', { userId, songId, error: error.message });
      throw error;
    }
  }

  // 根据ID查询
  async findById(id) {
    try {
      const sql = 'SELECT * FROM favorites WHERE id = ?';
      const rows = await db.query(sql, [id]);
      return rows.length > 0 ? Favorite.fromDatabase(rows[0]) : null;
    } catch (error) {
      logger.error('FavoriteDao.findById error', { id, error: error.message });
      throw error;
    }
  }
}

module.exports = new FavoriteDao();
```

### 步骤 3：创建业务逻辑层 (Service)

在 `src/services/` 下创建 `FavoriteService.js`：

```javascript
// src/services/FavoriteService.js
const favoriteDao = require('../dao/FavoriteDao');
const logger = require('../utils/logger');

class FavoriteService {
  // 获取收藏列表
  async getFavorites(userId, page, pageSize) {
    try {
      return await favoriteDao.findByUserId(userId, page, pageSize);
    } catch (error) {
      logger.error('FavoriteService.getFavorites error', { userId, error: error.message });
      throw error;
    }
  }

  // 添加收藏
  async addFavorite(userId, songId) {
    try {
      // 检查是否已经收藏
      const isFavorited = await favoriteDao.isFavorited(userId, songId);
      if (isFavorited) {
        throw new Error('该歌曲已在收藏列表中');
      }

      const favorite = await favoriteDao.create(userId, songId);
      logger.info('收藏成功', { userId, songId });
      return favorite;
    } catch (error) {
      logger.error('FavoriteService.addFavorite error', { userId, songId, error: error.message });
      throw error;
    }
  }

  // 删除收藏
  async removeFavorite(userId, songId) {
    try {
      const success = await favoriteDao.delete(userId, songId);
      if (!success) {
        throw new Error('收藏不存在');
      }
      logger.info('取消收藏成功', { userId, songId });
      return true;
    } catch (error) {
      logger.error('FavoriteService.removeFavorite error', { userId, songId, error: error.message });
      throw error;
    }
  }
}

module.exports = new FavoriteService();
```

### 步骤 4：创建控制器 (Controller)

在 `src/controllers/` 下创建 `FavoriteController.js`：

```javascript
// src/controllers/FavoriteController.js
const favoriteService = require('../services/FavoriteService');
const ResponseHelper = require('../utils/response');
const Validator = require('../utils/validator');
const logger = require('../utils/logger');

class FavoriteController {
  // 获取收藏列表
  async getFavorites(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, pageSize = 20 } = req.query;

      const validationRules = {
        userId: [{ type: 'required', message: '用户ID' }]
      };
      const errors = Validator.validate({ userId }, validationRules);
      if (errors.length > 0) {
        return res.status(400).json(ResponseHelper.badRequest(errors.join(', ')));
      }

      const result = await favoriteService.getFavorites(userId, page, pageSize);
      res.json(ResponseHelper.page(result.list, result.total, page, pageSize, '查询成功'));
    } catch (error) {
      logger.error('FavoriteController.getFavorites error', { error: error.message });
      res.status(500).json(ResponseHelper.error('查询失败', 500));
    }
  }

  // 添加收藏
  async addFavorite(req, res) {
    try {
      const { userId } = req.params;
      const { songId } = req.body;

      const validationRules = {
        userId: [{ type: 'required', message: '用户ID' }],
        songId: [{ type: 'required', message: '歌曲ID' }]
      };
      const errors = Validator.validate({ userId, songId }, validationRules);
      if (errors.length > 0) {
        return res.status(400).json(ResponseHelper.badRequest(errors.join(', ')));
      }

      const favorite = await favoriteService.addFavorite(userId, songId);
      res.status(201).json(ResponseHelper.success(favorite, '收藏成功'));
    } catch (error) {
      logger.error('FavoriteController.addFavorite error', { error: error.message });

      if (error.message === '该歌曲已在收藏列表中') {
        return res.status(400).json(ResponseHelper.badRequest(error.message));
      }

      res.status(500).json(ResponseHelper.error('收藏失败', 500));
    }
  }

  // 删除收藏
  async removeFavorite(req, res) {
    try {
      const { userId, songId } = req.params;

      const validationRules = {
        userId: [{ type: 'required', message: '用户ID' }],
        songId: [{ type: 'required', message: '歌曲ID' }]
      };
      const errors = Validator.validate({ userId, songId }, validationRules);
      if (errors.length > 0) {
        return res.status(400).json(ResponseHelper.badRequest(errors.join(', ')));
      }

      await favoriteService.removeFavorite(userId, songId);
      res.json(ResponseHelper.success(null, '取消收藏成功'));
    } catch (error) {
      logger.error('FavoriteController.removeFavorite error', { error: error.message });

      if (error.message === '收藏不存在') {
        return res.status(404).json(ResponseHelper.notFound('收藏不存在'));
      }

      res.status(500).json(ResponseHelper.error('取消收藏失败', 500));
    }
  }
}

module.exports = new FavoriteController();
```

### 步骤 5：创建路由 (Route)

在 `src/routes/` 下创建 `favorite.js`：

```javascript
// src/routes/favorite.js
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/FavoriteController');

// 获取收藏列表
router.get('/:userId', favoriteController.getFavorites.bind(favoriteController));

// 添加收藏
router.post('/:userId', favoriteController.addFavorite.bind(favoriteController));

// 删除收藏
router.delete('/:userId/:songId', favoriteController.removeFavorite.bind(favoriteController));

module.exports = router;
```

### 步骤 6：注册路由 (App.js)

在 `src/app.js` 中引入并使用新的路由：

```javascript
// src/app.js
// ... 其他 require ...
const favoriteRoutes = require('./routes/favorite');

class App {
  // ...
  
  setupRoutes() {
    // ... 其他路由 ...
    
    // 添加新的收藏功能路由
    this.app.use('/api/favorite', favoriteRoutes);
  }
  
  // ...
}
```

### 步骤 7：创建数据库表

在 `src/database/init.sql` 中添加新表：

```sql
-- 收藏表
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '收藏ID',
    user_id VARCHAR(64) NOT NULL COMMENT '用户ID',
    song_id INT NOT NULL COMMENT '歌曲ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
    UNIQUE KEY uk_user_song (user_id, song_id),
    INDEX idx_user_id (user_id),
    INDEX idx_song_id (song_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏表';
```

### 步骤 8：更新 API 文档

在 `src/config/api-doc.js` 中添加新接口的文档定义：

```javascript
const apiDocs = {
  // ... 其他配置 ...
  
  endpoints: {
    // ... 现有接口 ...
    
    favorite: {
      name: '收藏接口',
      description: '提供音乐收藏管理功能',
      endpoints: [
        {
          method: 'GET',
          path: '/api/favorite/:userId',
          description: '获取用户的收藏列表',
          parameters: [
            { name: 'userId', type: 'path', required: true, description: '用户ID' },
            { name: 'page', type: 'query', required: false, default: 1, description: '页码' },
            { name: 'pageSize', type: 'query', required: false, default: 20, description: '每页数量' }
          ],
          requestBody: null,
          response: { code: 0, message: '查询成功', data: {} },
          example: {
            request: 'GET /api/favorite/1?page=1&pageSize=20',
            response: {
              code: 0,
              message: '查询成功',
              data: { list: [], total: 0, page: 1, pageSize: 20 },
              timestamp: '2026-05-31T15:30:00.000Z'
            }
          }
        },
        {
          method: 'POST',
          path: '/api/favorite/:userId',
          description: '添加收藏',
          parameters: [
            { name: 'userId', type: 'path', required: true, description: '用户ID' }
          ],
          requestBody: {
            required: true,
            schema: { songId: { type: 'number', required: true, description: '歌曲ID' } },
            example: { songId: 1 }
          },
          response: { code: 0, message: '收藏成功', data: {} }
        },
        {
          method: 'DELETE',
          path: '/api/favorite/:userId/:songId',
          description: '删除收藏',
          parameters: [
            { name: 'userId', type: 'path', required: true, description: '用户ID' },
            { name: 'songId', type: 'path', required: true, description: '歌曲ID' }
          ],
          requestBody: null,
          response: { code: 0, message: '取消收藏成功', data: null }
        }
      ]
    }
  }
};

module.exports = apiDocs;
```

### 新增接口完成！

现在你已经成功添加了一个完整的新功能！重启服务后，新的接口将自动生效：

```
GET    /api/favorite/:userId     # 获取收藏列表
POST   /api/favorite/:userId     # 添加收藏
DELETE /api/favorite/:userId/:songId  # 删除收藏
```

---

## 配置说明

### 配置文件 (src/config/index.js)

```javascript
module.exports = {
  server: {
    port: process.env.PORT || 3000,           // 服务器端口
    env: process.env.NODE_ENV || 'development' // 运行环境
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'music_db',
    connectionLimit: 10,     // 连接池最大连接数
    waitForConnections: true,
    queueLimit: 0
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',    // 日志级别
    filename: process.env.LOG_FILE || 'logs/app.log'
  }
};
```

### 环境变量

创建 `.env` 文件（不要提交到 git）：

```env
# 数据库
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=music_db

# 服务器
PORT=3000
NODE_ENV=development

# 日志
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

---

## 常见问题

### Q1：数据库连接失败？

**解决方案**：
1. 检查 MySQL 服务是否已启动
2. 检查 `.env` 中的数据库配置是否正确
3. 检查数据库用户权限

### Q2：如何查看日志？

**解决方案**：
1. 控制台输出日志（开发环境）
2. 查看 `logs/app.log` 文件（需要手动创建 logs 目录）

### Q3：如何添加新的表？

**解决方案**：
1. 在 `src/database/init.sql` 中定义表结构
2. 创建对应的 Model（模型层）
3. 创建对应的 DAO（数据访问层）
4. 创建对应的 Service（业务逻辑层）
5. 创建对应的 Controller（控制层）
6. 创建对应的 Route（路由层）
7. 在 app.js 中注册路由
8. 更新 API 文档

### Q4：如何部署项目？

**部署步骤**：
1. 确保生产环境数据库已准备好
2. 配置 `.env` 文件
3. 运行 `npm install` 安装依赖
4. 使用 PM2 管理进程：
   ```bash
   npm install -g pm2
   pm2 start index.js --name music-api
   pm2 save
   pm2 startup
   ```

### Q5：如何修改统一响应格式？

**解决方案**：
修改 `src/utils/response.js` 文件中的 `ResponseHelper` 类。

---

## 总结

本项目的核心在于清晰的**分层架构**，使得：
- 📝 代码易读易懂
- 🔧 功能易于扩展
- 🧪 测试易于编写
- 🐛 问题易于定位

按照上面的步骤，你可以轻松地：
1. 理解整个项目的架构
2. 添加新的功能和接口
3. 修改和扩展现有代码

Happy coding! 🎉
