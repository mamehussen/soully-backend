const express = require('express');
const router = express.Router();

const {
  getAllMatches,
  getMatch
} = require('../controllers/matches');

router.route('/')
  .get(getAllMatches);

router.route('/:id')
  .get(getMatch);

module.exports = router;
