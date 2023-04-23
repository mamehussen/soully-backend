const Like = require('../models/Like');
const Match = require('../models/Match');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createLike = async (req, res) => {
  const { user: { _id: userId }, params: { id: likedUserId } } = req;
  const existingLike = await Like.findOne({ userId, likedUserId });
  if (existingLike) {
    throw new BadRequestError('You have already liked this user');
  }
  const newLike = await Like.create({ userId, likedUserId });
  const mutualLike = await Like.findOne({ userId: likedUserId, likedUserId: userId });
  if (mutualLike) {
    const newMatch = await Match.create({ user1: userId, user2: likedUserId });
    res.status(StatusCodes.CREATED).json({ match: newMatch });
  } else {
    res.status(StatusCodes.CREATED).json({ like: newLike });
  }
};

const getLike = async (req, res) => {
    const { user: { _id: userId }, params: { id: likeId } } = req;
    const like = await Like.findOne({ _id: likeId, user: userId }).exec();
    if (!like) {
      throw new NotFoundError('Could not find like');
    }
    res.status(StatusCodes.OK).json({ like });
  };

const deleteLike = async (req, res) => {
  const { user: { _id: userId }, params: { id: likedUserId } } = req;
  const like = await Like.findOneAndDelete({ userId, likedUserId });
  if (!like) {
    throw new NotFoundError('Could not find like');
  }
  res.status(StatusCodes.OK).send('Deleted Successfully');
};

module.exports = { createLike, deleteLike, getLike };