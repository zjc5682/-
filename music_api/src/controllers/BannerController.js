// music_api/src/controllers/BannerController.js
const BannerService = require('../services/BannerService');
const response = require('../utils/response');

class BannerController {
  static async getBanners(req, res, next) {
    try {
      const banners = await BannerService.getBanners();
      res.json(response.success({ banners }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BannerController;