const router = require('express').Router();
const SongController = require('../controllers/SongController');

router.get('/all', SongController.allSongs);
router.get('/latest', SongController.latest);

module.exports = router;
