class ResponseModel {
  constructor(code, message, data = null) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp
    };
  }
}

class ResponseHelper {
  static success(data = null, message = 'success') {
    return new ResponseModel(0, message, data).toJSON();
  }

  static error(message = '操作失败', code = -1) {
    return new ResponseModel(code, message, null).toJSON();
  }

  static page(data, total, page, pageSize, message = '查询成功') {
    return new ResponseModel(0, message, {
      list: data,
      total: total,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages: Math.ceil(total / pageSize)
    }).toJSON();
  }

  static notFound(message = '资源不存在') {
    return new ResponseModel(404, message, null).toJSON();
  }

  static unauthorized(message = '未授权访问') {
    return new ResponseModel(401, message, null).toJSON();
  }

  static badRequest(message = '请求参数错误') {
    return new ResponseModel(400, message, null).toJSON();
  }
}

module.exports = ResponseHelper;
