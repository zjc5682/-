const express = require('express');
const router = express.Router();
const musicController = require('../controllers/MusicController');

router.get('/', musicController.getAllMusic.bind(musicController));

router.get('/popular', musicController.getPopularMusic.bind(musicController));

router.get('/recent', musicController.getRecentlyAddedMusic.bind(musicController));

router.get('/:id', musicController.getMusicById.bind(musicController));

router.post('/', musicController.createMusic.bind(musicController));

router.put('/:id', musicController.updateMusic.bind(musicController));

router.delete('/:id', musicController.deleteMusic.bind(musicController));

router.post('/:id/play', musicController.playMusic.bind(musicController));

router.post('/:id/like', musicController.likeMusic.bind(musicController));

module.exports = router;
