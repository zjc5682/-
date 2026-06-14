const apiDocs = {
  name: '音乐API服务',
  version: '1.0.0',
  description: '提供音乐和歌单管理的RESTful API接口',
  baseUrl: 'http://localhost:3000',
  author: '',
  license: 'ISC',
  contact: {
    email: '',
    github: ''
  },
  server: {
    status: 'running',
    port: 3000,
    environment: 'development'
  },
  endpoints: {
    health: {
      method: 'GET',
      path: '/api/health',
      description: '健康检查和API概览',
      parameters: [],
      requestBody: null,
      response: {
        success: {
          code: 0,
          message: 'success',
          data: {
            name: '音乐API服务',
            version: '1.0.0',
            status: 'running',
            uptime: '运行时长',
            timestamp: '当前时间'
          }
        }
      },
      example: {
        request: 'GET /api/health',
        response: {
          code: 0,
          message: 'success',
          data: {
            name: '音乐API服务',
            version: '1.0.0',
            status: 'running',
            uptime: '2 hours, 30 minutes',
            timestamp: '2026-05-31T15:30:00.000Z',
            endpoints: {
              music: '/api/music',
              sheet: '/api/sheet'
            }
          }
        }
      }
    },
    music: {
      name: '音乐接口',
      description: '提供音乐的增删改查、播放、点赞等操作',
      endpoints: [
        {
          method: 'GET',
          path: '/api/music',
          description: '获取音乐列表（支持分页和筛选）',
          parameters: [
            { name: 'page', type: 'query', required: false, default: 1, description: '页码' },
            { name: 'pageSize', type: 'query', required: false, default: 10, description: '每页数量' },
            { name: 'category', type: 'query', required: false, description: '按分类筛选' },
            { name: 'artist', type: 'query', required: false, description: '按艺术家筛选（模糊匹配）' },
            { name: 'keyword', type: 'query', required: false, description: '关键词搜索（匹配标题、艺术家、专辑）' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: {
              list: [{}],
              total: 100,
              page: 1,
              pageSize: 10,
              totalPages: 10
            }
          },
          example: {
            request: 'GET /api/music?page=1&pageSize=10&category=流行',
            response: {
              code: 0,
              message: '查询成功',
              data: {
                list: [
                  {
                    id: 1,
                    title: '晴天',
                    artist: '周杰伦',
                    album: '叶惠美',
                    duration: 267,
                    url: 'https://example.com/music/qingtian.mp3',
                    cover_url: 'https://example.com/cover/qingtian.jpg',
                    category: '流行',
                    tags: '华语,经典',
                    play_count: 10000,
                    like_count: 500,
                    created_at: '2026-05-31T10:00:00.000Z',
                    updated_at: '2026-05-31T10:00:00.000Z'
                  }
                ],
                total: 3,
                page: 1,
                pageSize: 10,
                totalPages: 1
              },
              timestamp: '2026-05-31T15:30:00.000Z'
            }
          }
        },
        {
          method: 'GET',
          path: '/api/music/popular',
          description: '获取热门音乐列表',
          parameters: [
            { name: 'page', type: 'query', required: false, default: 1, description: '页码' },
            { name: 'pageSize', type: 'query', required: false, default: 10, description: '每页数量' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: [{}]
          },
          example: {
            request: 'GET /api/music/popular?page=1&pageSize=10',
            response: {
              code: 0,
              message: '查询成功',
              data: [
                { id: 3, title: '稻香', artist: '周杰伦', play_count: 12000 }
              ],
              timestamp: '2026-05-31T15:30:00.000Z'
            }
          }
        },
        {
          method: 'GET',
          path: '/api/music/recent',
          description: '获取最新添加的音乐',
          parameters: [
            { name: 'page', type: 'query', required: false, default: 1, description: '页码' },
            { name: 'pageSize', type: 'query', required: false, default: 10, description: '每页数量' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: [{}]
          }
        },
        {
          method: 'GET',
          path: '/api/music/:id',
          description: '获取音乐详情',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '音乐ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: {}
          },
          example: {
            request: 'GET /api/music/1',
            response: {
              code: 0,
              message: '查询成功',
              data: {
                id: 1,
                title: '晴天',
                artist: '周杰伦',
                album: '叶惠美',
                duration: 267,
                url: 'https://example.com/music/qingtian.mp3',
                cover_url: 'https://example.com/cover/qingtian.jpg',
                lyrics: '[00:00.00]歌词内容...',
                category: '流行',
                tags: '华语,经典',
                play_count: 10000,
                like_count: 500,
                created_at: '2026-05-31T10:00:00.000Z',
                updated_at: '2026-05-31T10:00:00.000Z'
              },
              timestamp: '2026-05-31T15:30:00.000Z'
            }
          }
        },
        {
          method: 'POST',
          path: '/api/music',
          description: '创建新音乐',
          parameters: [],
          requestBody: {
            required: true,
            schema: {
              title: { type: 'string', required: true, description: '音乐标题' },
              artist: { type: 'string', required: true, description: '艺术家' },
              album: { type: 'string', required: false, description: '专辑' },
              duration: { type: 'number', required: false, description: '时长（秒）' },
              url: { type: 'string', required: true, description: '音乐文件URL' },
              cover_url: { type: 'string', required: false, description: '封面图片URL' },
              lyrics: { type: 'string', required: false, description: '歌词' },
              category: { type: 'string', required: false, description: '分类' },
              tags: { type: 'string', required: false, description: '标签，逗号分隔' }
            },
            example: {
              title: '新歌',
              artist: '歌手名',
              album: '专辑名',
              duration: 240,
              url: 'https://example.com/music/new.mp3',
              cover_url: 'https://example.com/cover/new.jpg',
              category: '流行',
              tags: '华语,新歌'
            }
          },
          response: {
            code: 0,
            message: '创建成功',
            data: {}
          }
        },
        {
          method: 'PUT',
          path: '/api/music/:id',
          description: '更新音乐信息',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '音乐ID' }
          ],
          requestBody: {
            required: true,
            schema: {
              title: { type: 'string', required: false, description: '音乐标题' },
              artist: { type: 'string', required: false, description: '艺术家' },
              album: { type: 'string', required: false, description: '专辑' },
              duration: { type: 'number', required: false, description: '时长（秒）' },
              url: { type: 'string', required: false, description: '音乐文件URL' },
              cover_url: { type: 'string', required: false, description: '封面图片URL' },
              lyrics: { type: 'string', required: false, description: '歌词' },
              category: { type: 'string', required: false, description: '分类' },
              tags: { type: 'string', required: false, description: '标签，逗号分隔' }
            }
          },
          response: {
            code: 0,
            message: '更新成功',
            data: {}
          }
        },
        {
          method: 'DELETE',
          path: '/api/music/:id',
          description: '删除音乐',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '音乐ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '删除成功',
            data: null
          }
        },
        {
          method: 'POST',
          path: '/api/music/:id/play',
          description: '播放音乐（增加播放次数）',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '音乐ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '播放成功',
            data: {}
          }
        },
        {
          method: 'POST',
          path: '/api/music/:id/like',
          description: '点赞音乐（增加点赞次数）',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '音乐ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '点赞成功',
            data: {}
          }
        }
      ]
    },
    sheet: {
      name: '歌单接口',
      description: '提供歌单的增删改查、歌曲管理、收藏等功能',
      endpoints: [
        {
          method: 'GET',
          path: '/api/sheet',
          description: '获取歌单列表（支持分页）',
          parameters: [
            { name: 'page', type: 'query', required: false, default: 1, description: '页码' },
            { name: 'pageSize', type: 'query', required: false, default: 10, description: '每页数量' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: {
              list: [{}],
              total: 100,
              page: 1,
              pageSize: 10,
              totalPages: 10
            }
          },
          example: {
            request: 'GET /api/sheet?page=1&pageSize=10',
            response: {
              code: 0,
              message: '查询成功',
              data: {
                list: [
                  {
                    id: 1,
                    title: '我的收藏',
                    icon: 'assets/list1.jpg',
                    detail: '我喜欢的音乐合集',
                    clicksCount: 24459,
                    collectsCount: 28,
                    commentsCount: 44,
                    songsCount: 3,
                    userId: '1',
                    created: '2026-05-31T10:00:00.000Z',
                    updated: '2026-05-31T10:00:00.000Z'
                  }
                ],
                total: 2,
                page: 1,
                pageSize: 10,
                totalPages: 1
              },
              timestamp: '2026-05-31T15:30:00.000Z'
            }
          }
        },
        {
          method: 'GET',
          path: '/api/sheet/user/:userId',
          description: '获取指定用户的歌单',
          parameters: [
            { name: 'userId', type: 'path', required: true, description: '用户ID' },
            { name: 'page', type: 'query', required: false, default: 1, description: '页码' },
            { name: 'pageSize', type: 'query', required: false, default: 10, description: '每页数量' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: {
              list: [{}],
              total: 0,
              page: 1,
              pageSize: 10,
              totalPages: 0
            }
          }
        },
        {
          method: 'GET',
          path: '/api/sheet/:id',
          description: '获取歌单详情',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: {}
          },
          example: {
            request: 'GET /api/sheet/1',
            response: {
              code: 0,
              message: '查询成功',
              data: {
                id: 1,
                title: '我的收藏',
                icon: 'assets/list1.jpg',
                detail: '我喜欢的音乐合集',
                clicksCount: 24459,
                collectsCount: 28,
                commentsCount: 44,
                songsCount: 3,
                userId: '1',
                created: '2026-05-31T10:00:00.000Z',
                updated: '2026-05-31T10:00:00.000Z'
              },
              timestamp: '2026-05-31T15:30:00.000Z'
            }
          }
        },
        {
          method: 'GET',
          path: '/api/sheet/:id/songs',
          description: '获取歌单中的歌曲列表',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' },
            { name: 'page', type: 'query', required: false, default: 1, description: '页码' },
            { name: 'pageSize', type: 'query', required: false, default: 50, description: '每页数量' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '查询成功',
            data: [{}]
          }
        },
        {
          method: 'POST',
          path: '/api/sheet',
          description: '创建新歌单',
          parameters: [],
          requestBody: {
            required: true,
            schema: {
              title: { type: 'string', required: true, description: '歌单标题' },
              icon: { type: 'string', required: false, description: '图标URL' },
              detail: { type: 'string', required: false, description: '歌单描述' },
              userId: { type: 'string', required: false, description: '创建用户ID' }
            },
            example: {
              title: '我的新歌单',
              icon: 'assets/newlist.jpg',
              detail: '这是一个新创建的歌单',
              userId: '1'
            }
          },
          response: {
            code: 0,
            message: '创建成功',
            data: {}
          }
        },
        {
          method: 'PUT',
          path: '/api/sheet/:id',
          description: '更新歌单信息',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' }
          ],
          requestBody: {
            required: true,
            schema: {
              title: { type: 'string', required: false, description: '歌单标题' },
              icon: { type: 'string', required: false, description: '图标URL' },
              detail: { type: 'string', required: false, description: '歌单描述' }
            }
          },
          response: {
            code: 0,
            message: '更新成功',
            data: {}
          }
        },
        {
          method: 'DELETE',
          path: '/api/sheet/:id',
          description: '删除歌单',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '删除成功',
            data: null
          }
        },
        {
          method: 'POST',
          path: '/api/sheet/:id/songs',
          description: '添加歌曲到歌单',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' }
          ],
          requestBody: {
            required: true,
            schema: {
              songId: { type: 'number', required: true, description: '歌曲ID' }
            },
            example: {
              songId: 1
            }
          },
          response: {
            code: 0,
            message: '添加成功',
            data: null
          }
        },
        {
          method: 'DELETE',
          path: '/api/sheet/:id/songs/:songId',
          description: '从歌单移除歌曲',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' },
            { name: 'songId', type: 'path', required: true, description: '歌曲ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '移除成功',
            data: null
          }
        },
        {
          method: 'POST',
          path: '/api/sheet/:id/click',
          description: '点击歌单（增加点击数）',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '点击成功',
            data: {}
          }
        },
        {
          method: 'POST',
          path: '/api/sheet/:id/collect',
          description: '收藏歌单（增加收藏数）',
          parameters: [
            { name: 'id', type: 'path', required: true, description: '歌单ID' }
          ],
          requestBody: null,
          response: {
            code: 0,
            message: '收藏成功',
            data: {}
          }
        }
      ]
    }
  },
  responseFormats: {
    success: {
      code: 0,
      message: 'success',
      data: {},
      timestamp: 'ISO8601格式时间'
    },
    error: {
      code: -1,
      message: '错误信息',
      data: null,
      timestamp: 'ISO8601格式时间'
    },
    notFound: {
      code: 404,
      message: '资源不存在',
      data: null,
      timestamp: 'ISO8601格式时间'
    },
    badRequest: {
      code: 400,
      message: '请求参数错误',
      data: null,
      timestamp: 'ISO8601格式时间'
    },
    unauthorized: {
      code: 401,
      message: '未授权访问',
      data: null,
      timestamp: 'ISO8601格式时间'
    }
  },
  errorCodes: {
    0: '成功',
    '-1': '通用错误',
    400: '请求参数错误',
    401: '未授权访问',
    404: '资源不存在',
    500: '服务器内部错误'
  },
  notes: {
    authentication: '当前版本未实现认证，所有接口均可公开访问',
    pagination: '所有列表接口支持分页，使用 page 和 pageSize 参数',
    filtering: '音乐接口支持 category、artist、keyword 等筛选条件',
    timestamp: '所有时间戳使用 ISO8601 格式（UTC 时区）',
    contentType: '请求和响应的 Content-Type 均为 application/json'
  }
};

module.exports = apiDocs;
