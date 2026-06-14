/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80012 (8.0.12)
 Source Host           : localhost:3306
 Source Schema         : 陈

 Target Server Type    : MySQL
 Target Server Version : 80012 (8.0.12)
 File Encoding         : 65001

 Date: 10/06/2026 18:50:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banners
-- ----------------------------
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `imageUrl` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `sort` int(11) NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `icon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banners
-- ----------------------------
INSERT INTO `banners` VALUES (4, NULL, 'http://localhost:3000/static/images/banners/jhk-1781008414177.jpg', '', 1, '2026-06-09 20:35:37', 'http://localhost:3000/static/images/banners/jhk-1781008414177.jpg');
INSERT INTO `banners` VALUES (5, NULL, 'http://localhost:3000/static/images/banners/jhk-1781008416732.png', '', 2, '2026-06-09 20:35:37', 'http://localhost:3000/static/images/banners/jhk-1781008416732.png');
INSERT INTO `banners` VALUES (6, NULL, 'http://localhost:3000/static/images/banners/jhk-1781008421846.jpg', '', 3, '2026-06-09 20:35:37', 'http://localhost:3000/static/images/banners/jhk-1781008421846.jpg');
INSERT INTO `banners` VALUES (7, NULL, 'http://localhost:3000/static/images/banners/jhk-1781009104125.jpg', '', 4, '2026-06-09 20:50:39', 'http://localhost:3000/static/images/banners/jhk-1781009104125.jpg');
INSERT INTO `banners` VALUES (8, NULL, 'http://localhost:3000/static/images/banners/jhk-1781009108602.jpg', '', 5, '2026-06-09 20:50:39', 'http://localhost:3000/static/images/banners/jhk-1781009108602.jpg');
INSERT INTO `banners` VALUES (9, NULL, 'http://localhost:3000/static/images/banners/jhk-1781009542940.jpg', '', 4, '2026-06-09 20:53:39', 'http://localhost:3000/static/images/banners/jhk-1781009542940.jpg');
INSERT INTO `banners` VALUES (10, NULL, 'http://localhost:3000/static/images/banners/jhk-1781009559886.jpg', '', 5, '2026-06-09 20:53:39', 'http://localhost:3000/static/images/banners/jhk-1781009559886.jpg');

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '音乐ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '音乐标题',
  `artist` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '艺术家',
  `album` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '专辑',
  `duration` int(11) NULL DEFAULT NULL COMMENT '时长（秒）',
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '音乐文件URL',
  `cover_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '封面图片URL',
  `lyrics` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '歌词',
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分类',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标签，逗号分隔',
  `play_count` int(11) NULL DEFAULT 0 COMMENT '播放次数',
  `like_count` int(11) NULL DEFAULT 0 COMMENT '点赞次数',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_title`(`title` ASC) USING BTREE,
  INDEX `idx_artist`(`artist` ASC) USING BTREE,
  INDEX `idx_category`(`category` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '音乐表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO `music` VALUES (1, '晴天', '周杰伦', '叶惠美', 267, 'https://example.com/music/qingtian.mp3', 'https://example.com/cover/qingtian.jpg', NULL, '流行', '华语,经典', 10000, 500, '2026-06-09 20:18:04', '2026-06-09 20:18:04');
INSERT INTO `music` VALUES (2, '夜曲', '周杰伦', '十一月的萧邦', 258, 'https://example.com/music/yeque.mp3', 'https://example.com/cover/yeque.jpg', NULL, '流行', '华语,经典', 8000, 400, '2026-06-09 20:18:04', '2026-06-09 20:18:04');
INSERT INTO `music` VALUES (3, '稻香', '周杰伦', '魔杰座', 229, 'https://example.com/music/daoxiang.mp3', 'https://example.com/cover/daoxiang.jpg', NULL, '流行', '华语,治愈', 12000, 600, '2026-06-09 20:18:04', '2026-06-09 20:18:04');

-- ----------------------------
-- Table structure for play_history
-- ----------------------------
DROP TABLE IF EXISTS `play_history`;
CREATE TABLE `play_history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `song_id` int(11) NOT NULL,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `artist` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cover` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `played_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `song_id`(`song_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 299 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of play_history
-- ----------------------------
INSERT INTO `play_history` VALUES (1, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:14:51');
INSERT INTO `play_history` VALUES (2, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 11:14:54');
INSERT INTO `play_history` VALUES (3, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:14:54');
INSERT INTO `play_history` VALUES (4, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:21:18');
INSERT INTO `play_history` VALUES (5, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 11:21:19');
INSERT INTO `play_history` VALUES (6, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:21:20');
INSERT INTO `play_history` VALUES (7, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 11:21:20');
INSERT INTO `play_history` VALUES (8, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 11:21:27');
INSERT INTO `play_history` VALUES (9, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 11:21:28');
INSERT INTO `play_history` VALUES (10, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 11:21:28');
INSERT INTO `play_history` VALUES (11, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:21:29');
INSERT INTO `play_history` VALUES (12, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 11:21:29');
INSERT INTO `play_history` VALUES (13, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:22:59');
INSERT INTO `play_history` VALUES (14, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 11:23:01');
INSERT INTO `play_history` VALUES (15, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:23:01');
INSERT INTO `play_history` VALUES (16, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 11:23:13');
INSERT INTO `play_history` VALUES (17, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:25:59');
INSERT INTO `play_history` VALUES (18, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 11:26:01');
INSERT INTO `play_history` VALUES (19, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:27:10');
INSERT INTO `play_history` VALUES (20, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:31:42');
INSERT INTO `play_history` VALUES (21, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 11:36:21');
INSERT INTO `play_history` VALUES (22, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 11:40:43');
INSERT INTO `play_history` VALUES (23, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 11:45:22');
INSERT INTO `play_history` VALUES (24, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 13:17:28');
INSERT INTO `play_history` VALUES (25, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 13:17:33');
INSERT INTO `play_history` VALUES (26, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 13:17:34');
INSERT INTO `play_history` VALUES (27, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 13:17:35');
INSERT INTO `play_history` VALUES (28, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 13:17:39');
INSERT INTO `play_history` VALUES (29, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 13:17:40');
INSERT INTO `play_history` VALUES (30, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 13:17:41');
INSERT INTO `play_history` VALUES (31, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 13:19:47');
INSERT INTO `play_history` VALUES (32, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 13:30:03');
INSERT INTO `play_history` VALUES (33, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 13:30:05');
INSERT INTO `play_history` VALUES (34, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 13:30:21');
INSERT INTO `play_history` VALUES (35, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 13:36:36');
INSERT INTO `play_history` VALUES (36, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 14:32:31');
INSERT INTO `play_history` VALUES (37, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 14:32:31');
INSERT INTO `play_history` VALUES (38, 2, '七里香', '周杰伦', NULL, '', '2026-06-10 14:32:40');
INSERT INTO `play_history` VALUES (39, 4, '夜曲', '周杰伦', NULL, '', '2026-06-10 14:32:42');
INSERT INTO `play_history` VALUES (40, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 15:50:58');
INSERT INTO `play_history` VALUES (41, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 15:51:00');
INSERT INTO `play_history` VALUES (42, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 15:51:01');
INSERT INTO `play_history` VALUES (43, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 15:51:05');
INSERT INTO `play_history` VALUES (44, 7, '稻香', '周杰伦', 'http://localhost:3000/static/music/daoxiang.mp3', '', '2026-06-10 15:51:09');
INSERT INTO `play_history` VALUES (45, 8, '青花瓷', '周杰伦', 'http://localhost:3000/static/music/qinghuaci.mp3', '', '2026-06-10 15:51:09');
INSERT INTO `play_history` VALUES (46, 9, '海阔天空', 'Beyond', 'http://localhost:3000/static/music/haikuotiankong.mp3', '', '2026-06-10 15:51:10');
INSERT INTO `play_history` VALUES (47, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 15:51:24');
INSERT INTO `play_history` VALUES (48, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 15:59:00');
INSERT INTO `play_history` VALUES (49, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 15:59:01');
INSERT INTO `play_history` VALUES (50, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 15:59:01');
INSERT INTO `play_history` VALUES (51, 7, '稻香', '周杰伦', 'http://localhost:3000/static/music/daoxiang.mp3', '', '2026-06-10 16:00:17');
INSERT INTO `play_history` VALUES (52, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:38:05');
INSERT INTO `play_history` VALUES (53, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:38:20');
INSERT INTO `play_history` VALUES (54, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:38:21');
INSERT INTO `play_history` VALUES (55, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:38:23');
INSERT INTO `play_history` VALUES (56, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:38:25');
INSERT INTO `play_history` VALUES (57, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:38:25');
INSERT INTO `play_history` VALUES (58, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 16:38:27');
INSERT INTO `play_history` VALUES (59, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 16:38:28');
INSERT INTO `play_history` VALUES (60, 7, '稻香', '周杰伦', 'http://localhost:3000/static/music/daoxiang.mp3', '', '2026-06-10 16:38:29');
INSERT INTO `play_history` VALUES (61, 8, '青花瓷', '周杰伦', 'http://localhost:3000/static/music/qinghuaci.mp3', '', '2026-06-10 16:38:30');
INSERT INTO `play_history` VALUES (62, 9, '海阔天空', 'Beyond', 'http://localhost:3000/static/music/haikuotiankong.mp3', '', '2026-06-10 16:38:31');
INSERT INTO `play_history` VALUES (63, 10, 'Hotel California', 'Eagles', 'http://localhost:3000/static/music/hotel_california.mp3', '', '2026-06-10 16:40:02');
INSERT INTO `play_history` VALUES (64, 11, 'Stairway to Heaven', 'Led Zeppelin', 'http://localhost:3000/static/music/stairway_to_heaven.mp3', '', '2026-06-10 16:40:02');
INSERT INTO `play_history` VALUES (65, 12, 'Shape of You', 'Ed Sheeran', 'http://localhost:3000/static/music/shape_of_you.mp3', '', '2026-06-10 16:40:03');
INSERT INTO `play_history` VALUES (66, 13, 'Blinding Lights', 'The Weeknd', 'http://localhost:3000/static/music/blinding_lights.mp3', '', '2026-06-10 16:40:03');
INSERT INTO `play_history` VALUES (67, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 16:40:03');
INSERT INTO `play_history` VALUES (68, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 16:40:03');
INSERT INTO `play_history` VALUES (69, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 16:40:24');
INSERT INTO `play_history` VALUES (70, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 16:40:26');
INSERT INTO `play_history` VALUES (71, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 16:40:26');
INSERT INTO `play_history` VALUES (72, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 16:40:26');
INSERT INTO `play_history` VALUES (73, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 16:40:27');
INSERT INTO `play_history` VALUES (74, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 16:40:27');
INSERT INTO `play_history` VALUES (75, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 16:40:27');
INSERT INTO `play_history` VALUES (76, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 16:40:27');
INSERT INTO `play_history` VALUES (77, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:40:27');
INSERT INTO `play_history` VALUES (78, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:40:59');
INSERT INTO `play_history` VALUES (79, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:41:04');
INSERT INTO `play_history` VALUES (80, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:41:07');
INSERT INTO `play_history` VALUES (81, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:41:23');
INSERT INTO `play_history` VALUES (82, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:41:31');
INSERT INTO `play_history` VALUES (83, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:41:33');
INSERT INTO `play_history` VALUES (84, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:43:02');
INSERT INTO `play_history` VALUES (85, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:43:18');
INSERT INTO `play_history` VALUES (86, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:43:21');
INSERT INTO `play_history` VALUES (87, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:43:54');
INSERT INTO `play_history` VALUES (88, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:44:15');
INSERT INTO `play_history` VALUES (89, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 16:44:21');
INSERT INTO `play_history` VALUES (90, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:44:24');
INSERT INTO `play_history` VALUES (91, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:46:22');
INSERT INTO `play_history` VALUES (92, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:46:26');
INSERT INTO `play_history` VALUES (93, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:46:27');
INSERT INTO `play_history` VALUES (94, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:46:32');
INSERT INTO `play_history` VALUES (95, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:46:36');
INSERT INTO `play_history` VALUES (96, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:46:40');
INSERT INTO `play_history` VALUES (97, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:46:45');
INSERT INTO `play_history` VALUES (98, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 16:46:45');
INSERT INTO `play_history` VALUES (99, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:46:54');
INSERT INTO `play_history` VALUES (100, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:47:32');
INSERT INTO `play_history` VALUES (101, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:47:35');
INSERT INTO `play_history` VALUES (102, 10, 'Hotel California', 'Eagles', 'http://localhost:3000/static/music/hotel_california.mp3', '', '2026-06-10 16:47:36');
INSERT INTO `play_history` VALUES (103, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:48:49');
INSERT INTO `play_history` VALUES (104, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:48:52');
INSERT INTO `play_history` VALUES (105, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:48:56');
INSERT INTO `play_history` VALUES (106, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:48:58');
INSERT INTO `play_history` VALUES (107, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:48:58');
INSERT INTO `play_history` VALUES (108, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 16:48:58');
INSERT INTO `play_history` VALUES (109, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 16:48:58');
INSERT INTO `play_history` VALUES (110, 7, '稻香', '周杰伦', 'http://localhost:3000/static/music/daoxiang.mp3', '', '2026-06-10 16:48:59');
INSERT INTO `play_history` VALUES (111, 8, '青花瓷', '周杰伦', 'http://localhost:3000/static/music/qinghuaci.mp3', '', '2026-06-10 16:48:59');
INSERT INTO `play_history` VALUES (112, 9, '海阔天空', 'Beyond', 'http://localhost:3000/static/music/haikuotiankong.mp3', '', '2026-06-10 16:48:59');
INSERT INTO `play_history` VALUES (113, 10, 'Hotel California', 'Eagles', 'http://localhost:3000/static/music/hotel_california.mp3', '', '2026-06-10 16:49:01');
INSERT INTO `play_history` VALUES (114, 11, 'Stairway to Heaven', 'Led Zeppelin', 'http://localhost:3000/static/music/stairway_to_heaven.mp3', '', '2026-06-10 16:49:01');
INSERT INTO `play_history` VALUES (115, 12, 'Shape of You', 'Ed Sheeran', 'http://localhost:3000/static/music/shape_of_you.mp3', '', '2026-06-10 16:49:01');
INSERT INTO `play_history` VALUES (116, 13, 'Blinding Lights', 'The Weeknd', 'http://localhost:3000/static/music/blinding_lights.mp3', '', '2026-06-10 16:49:01');
INSERT INTO `play_history` VALUES (117, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 16:49:02');
INSERT INTO `play_history` VALUES (118, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 16:49:02');
INSERT INTO `play_history` VALUES (119, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 16:49:03');
INSERT INTO `play_history` VALUES (120, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 16:50:41');
INSERT INTO `play_history` VALUES (121, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 16:50:41');
INSERT INTO `play_history` VALUES (122, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:53:31');
INSERT INTO `play_history` VALUES (123, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 16:53:33');
INSERT INTO `play_history` VALUES (124, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 16:53:34');
INSERT INTO `play_history` VALUES (125, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 16:53:43');
INSERT INTO `play_history` VALUES (126, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:53:56');
INSERT INTO `play_history` VALUES (127, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 16:53:57');
INSERT INTO `play_history` VALUES (128, 10, 'Hotel California', 'Eagles', 'http://localhost:3000/static/music/hotel_california.mp3', '', '2026-06-10 16:53:57');
INSERT INTO `play_history` VALUES (129, 11, 'Stairway to Heaven', 'Led Zeppelin', 'http://localhost:3000/static/music/stairway_to_heaven.mp3', '', '2026-06-10 16:53:58');
INSERT INTO `play_history` VALUES (130, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 16:53:58');
INSERT INTO `play_history` VALUES (131, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:53:58');
INSERT INTO `play_history` VALUES (132, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 16:53:58');
INSERT INTO `play_history` VALUES (133, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 16:53:58');
INSERT INTO `play_history` VALUES (134, 13, 'Blinding Lights', 'The Weeknd', 'http://localhost:3000/static/music/blinding_lights.mp3', '', '2026-06-10 16:54:02');
INSERT INTO `play_history` VALUES (135, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 16:54:02');
INSERT INTO `play_history` VALUES (136, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 16:54:02');
INSERT INTO `play_history` VALUES (137, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 16:54:02');
INSERT INTO `play_history` VALUES (138, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 16:54:06');
INSERT INTO `play_history` VALUES (139, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 16:54:07');
INSERT INTO `play_history` VALUES (140, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 16:54:07');
INSERT INTO `play_history` VALUES (141, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 16:54:09');
INSERT INTO `play_history` VALUES (142, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 17:56:11');
INSERT INTO `play_history` VALUES (143, 12, 'Shape of You', 'Ed Sheeran', 'http://localhost:3000/static/music/shape_of_you.mp3', '', '2026-06-10 18:17:35');
INSERT INTO `play_history` VALUES (144, 13, 'Blinding Lights', 'The Weeknd', 'http://localhost:3000/static/music/blinding_lights.mp3', '', '2026-06-10 18:17:35');
INSERT INTO `play_history` VALUES (145, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:17:35');
INSERT INTO `play_history` VALUES (146, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:17:39');
INSERT INTO `play_history` VALUES (147, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:17:46');
INSERT INTO `play_history` VALUES (148, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 18:17:47');
INSERT INTO `play_history` VALUES (149, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 18:17:48');
INSERT INTO `play_history` VALUES (150, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 18:17:48');
INSERT INTO `play_history` VALUES (151, 7, '稻香', '周杰伦', 'http://localhost:3000/static/music/daoxiang.mp3', '', '2026-06-10 18:22:50');
INSERT INTO `play_history` VALUES (152, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:33:29');
INSERT INTO `play_history` VALUES (153, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:34:18');
INSERT INTO `play_history` VALUES (154, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:34:18');
INSERT INTO `play_history` VALUES (155, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:34:18');
INSERT INTO `play_history` VALUES (156, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:36:21');
INSERT INTO `play_history` VALUES (157, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:36:21');
INSERT INTO `play_history` VALUES (158, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:36:21');
INSERT INTO `play_history` VALUES (159, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:36:21');
INSERT INTO `play_history` VALUES (160, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:36:21');
INSERT INTO `play_history` VALUES (161, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:21');
INSERT INTO `play_history` VALUES (162, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (163, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (164, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (165, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (166, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (167, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (168, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (169, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (170, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (171, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:26');
INSERT INTO `play_history` VALUES (172, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:36:28');
INSERT INTO `play_history` VALUES (173, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (174, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (175, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (176, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (177, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (178, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (179, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (180, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (181, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:29');
INSERT INTO `play_history` VALUES (182, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (183, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (184, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (185, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (186, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (187, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (188, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (189, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (190, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (191, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:31');
INSERT INTO `play_history` VALUES (192, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (193, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (194, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (195, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (196, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (197, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (198, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (199, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (200, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (201, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:32');
INSERT INTO `play_history` VALUES (202, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:36:39');
INSERT INTO `play_history` VALUES (203, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:39');
INSERT INTO `play_history` VALUES (204, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:36:44');
INSERT INTO `play_history` VALUES (205, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:51');
INSERT INTO `play_history` VALUES (206, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (207, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (208, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (209, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (210, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (211, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (212, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (213, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:36:54');
INSERT INTO `play_history` VALUES (214, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (215, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (216, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (217, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (218, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (219, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (220, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (221, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (222, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (223, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:37:00');
INSERT INTO `play_history` VALUES (224, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (225, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (226, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (227, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (228, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (229, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (230, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (231, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (232, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (233, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (234, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (235, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (236, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (237, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (238, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (239, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (240, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (241, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (242, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (243, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (244, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (245, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (246, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (247, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (248, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (249, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (250, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (251, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (252, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (253, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (254, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (255, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (256, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (257, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (258, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (259, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (260, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (261, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (262, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (263, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:37:01');
INSERT INTO `play_history` VALUES (264, 17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (265, 16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (266, 15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (267, 14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (268, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (269, 22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (270, 21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (271, 20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (272, 19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (273, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:37:09');
INSERT INTO `play_history` VALUES (274, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:37:10');
INSERT INTO `play_history` VALUES (275, 2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', '', '2026-06-10 18:37:12');
INSERT INTO `play_history` VALUES (276, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 18:37:12');
INSERT INTO `play_history` VALUES (277, 6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', '', '2026-06-10 18:37:13');
INSERT INTO `play_history` VALUES (278, 7, '稻香', '周杰伦', 'http://localhost:3000/static/music/daoxiang.mp3', '', '2026-06-10 18:37:13');
INSERT INTO `play_history` VALUES (279, 8, '青花瓷', '周杰伦', 'http://localhost:3000/static/music/qinghuaci.mp3', '', '2026-06-10 18:37:14');
INSERT INTO `play_history` VALUES (280, 9, '海阔天空', 'Beyond', 'http://localhost:3000/static/music/haikuotiankong.mp3', '', '2026-06-10 18:37:14');
INSERT INTO `play_history` VALUES (281, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 18:37:17');
INSERT INTO `play_history` VALUES (282, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 18:37:19');
INSERT INTO `play_history` VALUES (283, 10, 'Hotel California', 'Eagles', 'http://localhost:3000/static/music/hotel_california.mp3', '', '2026-06-10 18:37:21');
INSERT INTO `play_history` VALUES (284, 11, 'Stairway to Heaven', 'Led Zeppelin', 'http://localhost:3000/static/music/stairway_to_heaven.mp3', '', '2026-06-10 18:37:22');
INSERT INTO `play_history` VALUES (285, 23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', '', '2026-06-10 18:37:22');
INSERT INTO `play_history` VALUES (286, 3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', '', '2026-06-10 18:37:22');
INSERT INTO `play_history` VALUES (287, 4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', '', '2026-06-10 18:37:22');
INSERT INTO `play_history` VALUES (288, 10, 'Hotel California', 'Eagles', 'http://localhost:3000/static/music/hotel_california.mp3', '', '2026-06-10 18:37:23');
INSERT INTO `play_history` VALUES (289, 18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', '', '2026-06-10 18:44:51');
INSERT INTO `play_history` VALUES (290, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:44:53');
INSERT INTO `play_history` VALUES (291, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:44:55');
INSERT INTO `play_history` VALUES (292, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:44:57');
INSERT INTO `play_history` VALUES (293, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:46:13');
INSERT INTO `play_history` VALUES (294, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:46:14');
INSERT INTO `play_history` VALUES (295, 5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', '', '2026-06-10 18:46:27');
INSERT INTO `play_history` VALUES (296, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:46:29');
INSERT INTO `play_history` VALUES (297, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:46:33');
INSERT INTO `play_history` VALUES (298, 1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', '', '2026-06-10 18:47:51');

-- ----------------------------
-- Table structure for playlist_songs
-- ----------------------------
DROP TABLE IF EXISTS `playlist_songs`;
CREATE TABLE `playlist_songs`  (
  `playlist_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `sort` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`playlist_id`, `song_id`) USING BTREE,
  INDEX `song_id`(`song_id` ASC) USING BTREE,
  CONSTRAINT `playlist_songs_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of playlist_songs
-- ----------------------------
INSERT INTO `playlist_songs` VALUES (1, 1, 1);
INSERT INTO `playlist_songs` VALUES (1, 2, 2);
INSERT INTO `playlist_songs` VALUES (1, 5, 3);
INSERT INTO `playlist_songs` VALUES (1, 6, 4);
INSERT INTO `playlist_songs` VALUES (1, 7, 5);
INSERT INTO `playlist_songs` VALUES (1, 8, 6);
INSERT INTO `playlist_songs` VALUES (1, 9, 7);
INSERT INTO `playlist_songs` VALUES (2, 3, 1);
INSERT INTO `playlist_songs` VALUES (2, 4, 2);
INSERT INTO `playlist_songs` VALUES (2, 10, 3);
INSERT INTO `playlist_songs` VALUES (2, 11, 4);
INSERT INTO `playlist_songs` VALUES (2, 23, 5);
INSERT INTO `playlist_songs` VALUES (3, 12, 1);
INSERT INTO `playlist_songs` VALUES (3, 13, 2);
INSERT INTO `playlist_songs` VALUES (3, 14, 3);
INSERT INTO `playlist_songs` VALUES (3, 15, 4);
INSERT INTO `playlist_songs` VALUES (3, 16, 5);
INSERT INTO `playlist_songs` VALUES (3, 17, 6);
INSERT INTO `playlist_songs` VALUES (4, 18, 1);
INSERT INTO `playlist_songs` VALUES (4, 19, 2);
INSERT INTO `playlist_songs` VALUES (4, 20, 3);
INSERT INTO `playlist_songs` VALUES (4, 21, 4);
INSERT INTO `playlist_songs` VALUES (4, 22, 5);

-- ----------------------------
-- Table structure for playlists
-- ----------------------------
DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cover` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '封面图片URL',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `play_count` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of playlists
-- ----------------------------
INSERT INTO `playlists` VALUES (1, '华语经典', 'https://picsum.photos/200?random=21', '那些年我们听过的华语金曲', 0);
INSERT INTO `playlists` VALUES (2, '欧美摇滚', 'https://picsum.photos/200?random=22', '经典欧美摇滚乐精选', 0);
INSERT INTO `playlists` VALUES (3, '电子迷幻', 'https://picsum.photos/200?random=23', '沉浸式电子音乐体验', 0);
INSERT INTO `playlists` VALUES (4, '爵士咖啡馆', 'https://picsum.photos/200?random=24', '适合咖啡时间的爵士乐', 0);

-- ----------------------------
-- Table structure for songs
-- ----------------------------
DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `artist` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '音乐文件完整URL',
  `duration` int(11) NULL DEFAULT 0 COMMENT '时长(秒)',
  `album` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `cover` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of songs
-- ----------------------------
INSERT INTO `songs` VALUES (1, '晴天', '周杰伦', 'http://localhost:3000/static/music/晴天.mp3', 269, '', '');
INSERT INTO `songs` VALUES (2, '七里香', '周杰伦', 'http://localhost:3000/static/music/七里香.mp3', 300, '', '');
INSERT INTO `songs` VALUES (3, 'Yellow', 'Coldplay', 'http://localhost:3000/static/music/yellow.mp3', 266, '', '');
INSERT INTO `songs` VALUES (4, 'Bohemian Rhapsody', 'Queen', 'http://localhost:3000/static/music/bohemian.mp3', 355, '', '');
INSERT INTO `songs` VALUES (5, '好久不见', '陈奕迅', 'http://localhost:3000/static/music/haojiubujian.mp3', 262, '认了吧', '');
INSERT INTO `songs` VALUES (6, '平凡之路', '朴树', 'http://localhost:3000/static/music/pingfanzhilu.mp3', 289, '平凡之路', '');
INSERT INTO `songs` VALUES (7, '稻香', '周杰伦', 'http://localhost:3000/static/music/daoxiang.mp3', 223, '魔杰座', '');
INSERT INTO `songs` VALUES (8, '青花瓷', '周杰伦', 'http://localhost:3000/static/music/qinghuaci.mp3', 234, '我很忙', '');
INSERT INTO `songs` VALUES (9, '海阔天空', 'Beyond', 'http://localhost:3000/static/music/haikuotiankong.mp3', 326, '海阔天空', '');
INSERT INTO `songs` VALUES (10, 'Hotel California', 'Eagles', 'http://localhost:3000/static/music/hotel_california.mp3', 391, 'Hotel California', '');
INSERT INTO `songs` VALUES (11, 'Stairway to Heaven', 'Led Zeppelin', 'http://localhost:3000/static/music/stairway_to_heaven.mp3', 482, 'Led Zeppelin IV', '');
INSERT INTO `songs` VALUES (12, 'Shape of You', 'Ed Sheeran', 'http://localhost:3000/static/music/shape_of_you.mp3', 263, '÷', '');
INSERT INTO `songs` VALUES (13, 'Blinding Lights', 'The Weeknd', 'http://localhost:3000/static/music/blinding_lights.mp3', 200, 'After Hours', '');
INSERT INTO `songs` VALUES (14, 'Dance Monkey', 'Tones and I', 'http://localhost:3000/static/music/dance_monkey.mp3', 209, 'The Kids Are Coming', '');
INSERT INTO `songs` VALUES (15, 'Faded', 'Alan Walker', 'http://localhost:3000/static/music/faded.mp3', 212, 'Different World', '');
INSERT INTO `songs` VALUES (16, 'Something Just Like This', 'The Chainsmokers & Coldplay', 'http://localhost:3000/static/music/something_just_like_this.mp3', 247, 'Memories...Do Not Open', '');
INSERT INTO `songs` VALUES (17, 'Sunflower', 'Post Malone', 'http://localhost:3000/static/music/sunflower.mp3', 158, 'Hollywood\'s Bleeding', '');
INSERT INTO `songs` VALUES (18, 'Take Five', 'Dave Brubeck', 'http://localhost:3000/static/music/take_five.mp3', 324, 'Time Out', '');
INSERT INTO `songs` VALUES (19, 'Fly Me to the Moon', 'Frank Sinatra', 'http://localhost:3000/static/music/fly_me_to_the_moon.mp3', 146, 'It Might as Well Be Swing', '');
INSERT INTO `songs` VALUES (20, 'Autumn Leaves', 'Bill Evans', 'http://localhost:3000/static/music/autumn_leaves.mp3', 362, 'Portrait in Jazz', '');
INSERT INTO `songs` VALUES (21, 'My Way', 'Frank Sinatra', 'http://localhost:3000/static/music/my_way.mp3', 277, 'My Way', '');
INSERT INTO `songs` VALUES (22, 'The Girl from Ipanema', 'Stan Getz & João Gilberto', 'http://localhost:3000/static/music/girl_from_ipanema.mp3', 322, 'Getz/Gilberto', '');
INSERT INTO `songs` VALUES (23, 'Lose Yourself', 'Eminem', 'http://localhost:3000/static/music/lose_yourself.mp3', 326, '8 Mile Soundtrack', '');

-- ----------------------------
-- Table structure for t_sheet_list
-- ----------------------------
DROP TABLE IF EXISTS `t_sheet_list`;
CREATE TABLE `t_sheet_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '歌单ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '歌单标题',
  `icon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图标URL',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '歌单描述',
  `clicks_count` int(11) NULL DEFAULT 0 COMMENT '点击次数',
  `collects_count` int(11) NULL DEFAULT 0 COMMENT '收藏次数',
  `comments_count` int(11) NULL DEFAULT 0 COMMENT '评论次数',
  `songs_count` int(11) NULL DEFAULT 0 COMMENT '歌曲数量',
  `user_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '创建用户ID',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_title`(`title` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_created`(`created` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '歌单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_sheet_list
-- ----------------------------
INSERT INTO `t_sheet_list` VALUES (1, '我的收藏', 'assets/list1.jpg', '我喜欢的音乐合集', 24459, 28, 44, 3, '1', '2026-06-09 20:18:04', '2026-06-09 20:18:04');
INSERT INTO `t_sheet_list` VALUES (2, '轻音乐', 'assets/list2.jpg', '放松心情的音乐', 12000, 15, 20, 0, '1', '2026-06-09 20:18:04', '2026-06-09 20:18:04');

-- ----------------------------
-- Table structure for t_sheet_song
-- ----------------------------
DROP TABLE IF EXISTS `t_sheet_song`;
CREATE TABLE `t_sheet_song`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `sheet_id` int(11) NOT NULL COMMENT '歌单ID',
  `song_id` int(11) NOT NULL COMMENT '歌曲ID',
  `position` int(11) NULL DEFAULT 0 COMMENT '位置顺序',
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_sheet_song`(`sheet_id` ASC, `song_id` ASC) USING BTREE,
  INDEX `idx_sheet_id`(`sheet_id` ASC) USING BTREE,
  INDEX `idx_song_id`(`song_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '歌单歌曲关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_sheet_song
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
