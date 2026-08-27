const Message = require('../models/message.model');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');

exports.createAnnouncement = asyncHandler(async (req, res, next) => {
  const { eventId, text } = req.body;
  const senderId = req.user.userId;

  if (!eventId || !text) {
    return next(new AppError('eventId and text are required', 400));
  }

  const message = await Message.create({
    event: eventId,
    sender: senderId,
    text,
  });

  const populatedMessage = await message.populate('sender', 'name email');

  const io = req.app.get('io');
  io.to(eventId).emit('announcement', populatedMessage);

  res.status(201).json({
    status: 'success',
    data: populatedMessage,
  });
});

exports.getAnnouncements = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const messages = await Message.find({ event: eventId })
    .sort({ createdAt: 1 })
    .populate('sender', 'name email');

  res.status(200).json({
    status: 'success',
    total: messages.length,
    data: messages,
  });
});