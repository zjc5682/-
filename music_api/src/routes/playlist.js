const router = require('express').Router();
const PlaylistController = require('../controllers/PlaylistController');

router.get('/official', PlaylistController.official);
router.get('/:id/songs', PlaylistController.songs);
router.get('/:id', PlaylistController.detail);

module.exports = router;
