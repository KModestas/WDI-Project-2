const router = require('express').Router();

router.get('/', (req, res) => res.render('statics/index'));

module.exports = router;
