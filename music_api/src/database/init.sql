-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS music_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE music_db;

-- 创建音乐表
CREATE TABLE IF NOT EXISTS music (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '音乐ID',
    title VARCHAR(255) NOT NULL COMMENT '音乐标题',
    artist VARCHAR(255) NOT NULL COMMENT '艺术家',
    album VARCHAR(255) COMMENT '专辑',
    duration INT COMMENT '时长（秒）',
    url VARCHAR(500) NOT NULL COMMENT '音乐文件URL',
    cover_url VARCHAR(500) COMMENT '封面图片URL',
    lyrics TEXT COMMENT '歌词',
    category VARCHAR(100) COMMENT '分类',
    tags VARCHAR(255) COMMENT '标签，逗号分隔',
    play_count INT DEFAULT 0 COMMENT '播放次数',
    like_count INT DEFAULT 0 COMMENT '点赞次数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_title (title),
    INDEX idx_artist (artist),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='音乐表';

-- 创建歌单表
CREATE TABLE IF NOT EXISTS t_sheet_list (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '歌单ID',
    title VARCHAR(255) NOT NULL COMMENT '歌单标题',
    icon VARCHAR(500) COMMENT '图标URL',
    detail TEXT COMMENT '歌单描述',
    clicks_count INT DEFAULT 0 COMMENT '点击次数',
    collects_count INT DEFAULT 0 COMMENT '收藏次数',
    comments_count INT DEFAULT 0 COMMENT '评论次数',
    songs_count INT DEFAULT 0 COMMENT '歌曲数量',
    user_id VARCHAR(64) COMMENT '创建用户ID',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_title (title),
    INDEX idx_user_id (user_id),
    INDEX idx_created (created)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='歌单表';

-- 创建歌单-歌曲关联表（N:N关系）
CREATE TABLE IF NOT EXISTS t_sheet_song (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID',
    sheet_id INT NOT NULL COMMENT '歌单ID',
    song_id INT NOT NULL COMMENT '歌曲ID',
    position INT DEFAULT 0 COMMENT '位置顺序',
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    UNIQUE KEY uk_sheet_song (sheet_id, song_id),
    INDEX idx_sheet_id (sheet_id),
    INDEX idx_song_id (song_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='歌单歌曲关联表';

-- 插入一些示例数据
INSERT INTO music (title, artist, album, duration, url, cover_url, category, tags, play_count, like_count) VALUES
('晴天', '周杰伦', '叶惠美', 267, 'https://example.com/music/qingtian.mp3', 'https://example.com/cover/qingtian.jpg', '流行', '华语,经典', 10000, 500),
('夜曲', '周杰伦', '十一月的萧邦', 258, 'https://example.com/music/yeque.mp3', 'https://example.com/cover/yeque.jpg', '流行', '华语,经典', 8000, 400),
('稻香', '周杰伦', '魔杰座', 229, 'https://example.com/music/daoxiang.mp3', 'https://example.com/cover/daoxiang.jpg', '流行', '华语,治愈', 12000, 600);

INSERT INTO t_sheet_list (title, icon, detail, clicks_count, collects_count, comments_count, songs_count, user_id) VALUES
('我的收藏', 'assets/list1.jpg', '我喜欢的音乐合集', 24459, 28, 44, 3, '1'),
('轻音乐', 'assets/list2.jpg', '放松心情的音乐', 12000, 15, 20, 0, '1');
