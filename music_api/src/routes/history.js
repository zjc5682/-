const router = require('express').Router();
const PlayHistoryController = require('../controllers/PlayHistoryController');

router.get('/recent', PlayHistoryController.recent);
router.post('/add', PlayHistoryController.add);

module.exports = router;
