const router = require('express').Router();

router.get('/v1/indexes', (req, res) => {
  res.json({ code: 0, data: [] });
});

module.exports = router;
