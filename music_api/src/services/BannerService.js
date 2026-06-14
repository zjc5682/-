// music_api/src/services/BannerService.js
const Banner = require('../models/Banner');

class BannerService {
  static async getBanners() {
    const banners = await Banner.getAll();
    return banners.map(b => ({
      icon: b.icon,
      link: b.link || ''
    }));
  }
}

module.exports = BannerService;