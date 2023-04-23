const Match = require('../models/Match');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const getAllMatches = async (req, res) => {
  const { user: { _id: userId } } = req;
  const matches = await Match.find({ $or: [{ user1: userId }, { user2: userId }] }).populate('user1 user2').exec();
  res.status(StatusCodes.OK).json({ matches });
};

const getMatch = async (req, res) => {
  const { user: { _id: userId }, params: { id: matchId } } = req;
  const match = await Match.findOne({ _id: matchId, $or: [{ user1: userId }, { user2: userId }] }).populate('user1 user2').exec();
  if (!match) {
    throw new NotFoundError('Could not find match');
  }
  res.status(StatusCodes.OK).json({ match });
};

module.exports = { getAllMatches, getMatch };