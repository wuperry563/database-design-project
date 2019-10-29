var express = require('express');
var router = express.Router();
const db = require('../queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

router.get('/users', db.getUsers)

router.get('/search', db.searchQuery)

router.get('/checkout', db.checkout)

router.post('/sql', db.query)

module.exports = router;
