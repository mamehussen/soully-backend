const express = require('express');
const router = express.Router();

const {
  createLike,
  getLike,
  deleteLike
} = require('../controllers/likes');

router.route('/')
  .post(createLike);

router.route('/:id')
  .get(getLike)
  .delete(deleteLike);

module.exports = router;