# 🎵 音乐播放器应用

一个功能完整的音乐播放器桌面应用，采用前后端分离架构，提供音乐播放、歌单管理、播放历史等功能。

## 📋 项目概述

### 项目定位
这是一个本地化的音乐播放器应用，主要面向个人用户，提供：
- 🎧 音乐播放与控制
- 📝 歌单管理与收藏
- 🕒 播放历史记录
- 🔍 音乐搜索与发现
- 🎨 现代化 UI 界面

### 技术栈

#### 前端 (electron-app)
- **框架**: Vue 3 + Composition API
- **UI 组件**: Element Plus
- **桌面框架**: Electron
- **构建工具**: Vite + electron-vite
- **路由**: Vue Router 4
- **国际化**: Vue I18n
- **图标**: Iconify
- **CSS 工具**: UnoCSS

#### 后端 (music_api)
- **运行时**: Node.js
- **框架**: Express 5
- **数据库**: MySQL 8.0
- **ORM**: mysql2 (原生连接池)
- **跨域**: CORS
- **环境变量**: dotenv

## 🏗️ 项目架构

```
cheng/
├── electron-app/          # Electron 桌面应用
│   ├── src/
│   │   ├── main/         # Electron 主进程
│   │   ├── preload/      # 预加载脚本
│   │   └── renderer/     # Vue 渲染进程
│   │       ├── src/
│   │       │   ├── components/    # Vue 组件
│   │       │   ├── views/         # 页面视图
│   │       │   ├── composables/   # 组合式函数
│   │       │   ├── router/        # 路由配置
│   │       │   ├── locales/       # 国际化文件
│   │       │   └── utils/         # 工具函数
│   │       └── index.html
│   └── package.json
├── music_api/             # 后端 API 服务
│   ├── src/
│   │   ├── controllers/  # 控制器
│   │   ├── services/     # 业务逻辑层
│   │   ├── models/       # 数据模型
│   │   ├── routes/       # 路由定义
│   │   ├── database/     # 数据库连接
│   │   ├── middleware/   # 中间件
│   │   └── utils/        # 工具函数
│   └── package.json
├── start.bat              # 一键启动脚本
├── 陈.sql                 # 数据库初始化脚本
└── README.md              # 项目说明文档
```

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MySQL**: >= 8.0
- **操作系统**: Windows 10/11 (推荐)

### 1. 克隆项目

```bash
git clone https://github.com/zjc5682/-.git
cd cheng
```

### 2. 数据库配置

#### 创建数据库
```sql
CREATE DATABASE 陈 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 导入数据
```bash
mysql -u root -p 陈 < 陈.sql
```

#### 修改数据库配置
编辑 `music_api/src/config/index.js` 文件：

```javascript
module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'your_username',     // 修改为你的用户名
    password: process.env.DB_PASSWORD || 'your_password', // 修改为你的密码
    database: process.env.DB_NAME || '陈',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
  }
};
```

### 3. 安装依赖

#### 方式一：使用启动脚本（推荐）
```bash
# 双击运行 start.bat 或在命令行执行
./start.bat
```

#### 方式二：手动安装
```bash
# 安装后端依赖
cd music_api
npm install

# 安装前端依赖
cd ../electron-app
npm install
```

### 4. 启动应用

#### 方式一：使用启动脚本（推荐）
```bash
./start.bat
```

#### 方式二：手动启动
```bash
# 启动后端服务
cd music_api
npm start

# 新终端窗口，启动前端应用
cd electron-app
npm run dev
```

## 📖 功能说明

### 🎵 音乐播放

#### 核心功能
- **播放控制**: 播放/暂停/上一首/下一首
- **进度控制**: 拖拽进度条、前进/后退 10 秒
- **音量调节**: 音量滑块、静音切换
- **播放模式**: 列表循环、随机播放（开发中）

#### 播放器特性
- 自动播放下一首
- 播放失败自动跳过
- 播放历史记录
- 歌曲封面显示

### 📝 歌单管理

#### 歌单功能
- 创建新歌单
- 编辑歌单信息
- 删除歌单
- 收藏歌单
- 歌单内歌曲管理

#### 歌单详情
- 歌曲列表展示
- 播放全部歌曲
- 单曲播放
- 歌曲排序（开发中）

### 🔍 音乐发现

#### 分类浏览
- 推荐歌单
- 官方歌单
- 热门歌曲
- 最新歌曲

#### 搜索功能
- 关键词搜索（开发中）
- 分类筛选（开发中）

### 🕒 历史记录

#### 播放历史
- 自动记录播放历史
- 查看最近播放
- 清空历史记录（开发中）

## 🎨 界面布局

### 主界面结构
```
┌─────────────────────────────────────────────────────┐
│                    顶部导航栏                        │
├─────────┬───────────────────────────────────────────┤
│         │                                           │
│  左侧   │              内容区域                      │
│  菜单   │         (歌单/歌曲/设置等)                 │
│         │                                           │
│         │                                           │
├─────────┴───────────────────────────────────────────┤
│                    底部播放器                        │
│  [进度条] [播放控制] [音量] [歌曲信息]               │
└─────────────────────────────────────────────────────┘
```

### 页面说明

#### 主要页面
1. **精选页面** (`/`) - 默认首页，展示推荐内容
2. **发现页面** (`/discover`) - 分类浏览音乐
3. **博客页面** (`/blog`) - 音乐相关文章（开发中）
4. **关注页面** (`/follow`) - 关注的歌手/用户（开发中）
5. **设置页面** (`/setting`) - 应用设置

#### 功能页面
1. **所有歌曲** (`/allSongs`) - 浏览所有歌曲
2. **随机歌曲** (`/randomSongs`) - 随机推荐歌曲
3. **歌单详情** (`/sheetDetail/:id`) - 查看歌单详情
4. **播放列表详情** (`/playlist/:id`) - 查看播放列表
5. **最近播放** (`/recentlyPlayed`) - 播放历史记录
6. **下载管理** (`/download`) - 下载管理（开发中）
7. **收藏音乐** (`/favoriteMusic`) - 收藏的音乐
8. **本地音乐** (`/localMusic`) - 本地音乐文件（开发中）

## 🔧 API 接文档

### 基础信息
- **基础URL**: `http://localhost:3000/api`
- **数据格式**: JSON
- **字符编码**: UTF-8

### 健康检查
```http
GET /api/health
```

响应示例：
```json
{
  "code": 200,
  "message": "服务运行正常",
  "data": {
    "name": "音乐API服务",
    "version": "1.0.0",
    "status": "running",
    "timestamp": "2026-06-14T12:00:00.000Z"
  }
}
```

### 音乐接口

#### 获取所有音乐
```http
GET /api/music?page=1&pageSize=10&category=流行&artist=周杰伦&keyword=晴天
```

#### 获取单首音乐
```http
GET /api/music/:id
```

#### 创建音乐
```http
POST /api/music
Content-Type: application/json

{
  "title": "歌曲标题",
  "artist": "艺术家",
  "url": "https://example.com/music.mp3",
  "album": "专辑名称",
  "duration": 240,
  "cover_url": "https://example.com/cover.jpg",
  "category": "流行",
  "tags": "华语,经典"
}
```

#### 播放音乐
```http
POST /api/music/:id/play
```

#### 点赞音乐
```http
POST /api/music/:id/like
```

### 歌单接口

#### 获取所有歌单
```http
GET /api/sheet?page=1&pageSize=10
```

#### 获取用户歌单
```http
GET /api/sheet/user/:userId?page=1&pageSize=10
```

#### 获取歌单详情
```http
GET /api/sheet/:id
```

#### 获取歌单歌曲
```http
GET /api/sheet/:id/songs?page=1&pageSize=50
```

#### 创建歌单
```http
POST /api/sheet
Content-Type: application/json

{
  "title": "歌单标题",
  "description": "歌单描述",
  "cover_url": "https://example.com/cover.jpg",
  "user_id": 1
}
```

#### 添加歌曲到歌单
```http
POST /api/sheet/:id/songs
Content-Type: application/json

{
  "songId": 1
}
```

### 播放历史接口

#### 获取播放历史
```http
GET /api/history?page=1&pageSize=20
```

#### 添加播放记录
```http
POST /api/history/add
Content-Type: application/json

{
  "song": {
    "id": 1,
    "title": "歌曲标题",
    "artist": "艺术家",
    "url": "https://example.com/music.mp3",
    "cover": "https://example.com/cover.jpg"
  }
}
```

## 🛠️ 开发指南

### 项目结构说明

#### 前端组件结构
```
src/renderer/src/
├── components/           # 可复用组件
│   ├── BottomPlayer.vue  # 底部播放器
│   ├── LeftPanel.vue     # 左侧面板
│   ├── RightPanel.vue    # 右侧面板
│   ├── TopBar.vue        # 顶部导航栏
│   ├── MainMenu.vue      # 主菜单
│   └── ...              # 其他组件
├── views/               # 页面视图
│   ├── SelectedView.vue # 精选页面
│   ├── DiscoverView.vue # 发现页面
│   ├── AllSongsView.vue # 所有歌曲
│   └── ...             # 其他页面
├── composables/         # 组合式函数
│   ├── usePlayer.js     # 播放器状态管理
│   ├── useTheme.js      # 主题管理
│   └── ...             # 其他组合函数
└── router/              # 路由配置
    └── index.js
```

#### 后端架构
```
music_api/src/
├── controllers/         # 控制器层
│   ├── MusicController.js
│   ├── SheetController.js
│   └── ...
├── services/           # 业务逻辑层
│   ├── MusicService.js
│   ├── SheetService.js
│   └── ...
├── models/             # 数据模型层
│   ├── Music.js
│   ├── Sheet.js
│   └── ...
├── routes/             # 路由定义
│   ├── music.js
│   ├── sheet.js
│   └── ...
├── database/           # 数据库连接
│   └── connection.js
└── middleware/         # 中间件
    ├── errorHandler.js
    └── requestLogger.js
```

### 开发命令

```bash
# 前端开发
cd electron-app
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run lint         # 代码检查
npm run format       # 代码格式化

# 后端开发
cd music_api
npm run dev          # 启动开发服务器（同 start）
```

### 环境变量配置

创建 `music_api/.env` 文件：

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=陈

# 日志配置
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### 数据库设计

#### 主要表结构

**music 表** - 音乐信息
```sql
CREATE TABLE music (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  duration INT,
  url VARCHAR(500) NOT NULL,
  cover_url VARCHAR(500),
  lyrics TEXT,
  category VARCHAR(100),
  tags VARCHAR(255),
  play_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**sheets 表** - 歌单信息
```sql
CREATE TABLE sheets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_url VARCHAR(500),
  user_id INT,
  play_count INT DEFAULT 0,
  collect_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**play_history 表** - 播放历史
```sql
CREATE TABLE play_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  song_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(200),
  url VARCHAR(500),
  cover VARCHAR(500),
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 使用指南

### 基本操作

#### 1. 播放音乐
- 在歌曲列表中点击歌曲即可播放
- 使用底部播放器控制播放
- 支持键盘快捷键（开发中）

#### 2. 管理歌单
- 点击左侧菜单"新建歌单"
- 在歌单详情页添加/删除歌曲
- 收藏喜欢的歌单

#### 3. 查看历史
- 点击左侧菜单"最近播放"
- 查看播放历史记录
- 点击历史歌曲重新播放

### 高级功能

#### 1. 主题切换
- 点击设置页面
- 选择深色/浅色主题
- 自定义主题颜色（开发中）

#### 2. 语言切换
- 支持中文简体、中文繁体、英文
- 在设置页面切换语言

#### 3. 音乐搜索
- 使用顶部搜索框
- 支持歌手、歌曲名搜索
- 分类筛选（开发中）

## 🐛 常见问题

### Q1: 启动时提示数据库连接失败
**解决方案**:
1. 检查 MySQL 服务是否启动
2. 确认数据库配置是否正确
3. 检查用户名密码是否正确
4. 确认数据库 `陈` 是否存在

### Q2: 前端页面无法加载
**解决方案**:
1. 检查后端服务是否启动 (`http://localhost:3000`)
2. 查看浏览器控制台是否有错误
3. 确认依赖是否安装完整

### Q3: 音乐无法播放
**解决方案**:
1. 检查音乐文件 URL 是否有效
2. 确认网络连接是否正常
3. 查看播放器错误提示

### Q4: 歌曲列表为空
**解决方案**:
1. 检查数据库中是否有音乐数据
2. 运行 `陈.sql` 导入示例数据
3. 通过 API 手动添加音乐

## 📦 部署说明

### 生产环境构建

```bash
# 构建前端
cd electron-app
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux

# 构建产物在 electron-app/dist/ 目录
```

### 后端部署

```bash
# 使用 PM2 管理进程
npm install -g pm2
cd music_api
pm2 start index.js --name music-api

# 查看日志
pm2 logs music-api

# 重启服务
pm2 restart music-api
```

### 环境变量配置

生产环境建议使用环境变量：

```bash
export NODE_ENV=production
export PORT=3000
export DB_HOST=your_db_host
export DB_USER=your_db_user
export DB_PASSWORD=your_db_password
export DB_NAME=陈
```

## 🤝 贡献指南

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 组合式 API 风格
- 后端遵循 MVC 架构模式

### 提交规范

使用 Conventional Commits 规范：

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**类型**:
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统
- `ci`: CI 配置
- `chore`: 其他更改

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI 组件库
- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- [Express](https://expressjs.com/) - Node.js Web 应用框架
- [UnoCSS](https://uno.antfu.me/) - 即时原子化 CSS 引擎

## 📞 联系方式

- 项目链接: https://github.com/zjc5682/-.git
- 问题反馈: [Issues](https://github.com/zjc5682/-/issues)

---

**🎵 享受音乐，享受生活！**
