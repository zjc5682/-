// music_api/src/routes/banner.js
const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/BannerController');

router.get('/banners', BannerController.getBanners);

module.exports = router;