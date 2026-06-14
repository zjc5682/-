const logger = require('../utils/logger');
const ResponseHelper = require('../utils/response');

function errorHandler(err, req, res, next) {
  logger.error('全局错误处理器捕获到错误', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err.name === 'ValidationError') {
    return res.status(400).json(ResponseHelper.badRequest(err.message));
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(ResponseHelper.unauthorized('未授权访问'));
  }

  res.status(500).json(ResponseHelper.error('服务器内部错误', 500));
}

function notFoundHandler(req, res) {
  logger.warn('路由未找到', { path: req.path, method: req.method });
  res.status(404).json(ResponseHelper.notFound('接口不存在'));
}

module.exports = {
  errorHandler,
  notFoundHandler
};
