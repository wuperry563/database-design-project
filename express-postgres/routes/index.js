var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

module.exports = router;
