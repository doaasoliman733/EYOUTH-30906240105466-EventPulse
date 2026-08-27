const router = require('express').Router();

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const {
  createEventValidation,
  updateEventValidation,
} = require('../middleware/validators');

const ctrl = require('../controllers/events.controller');

router.get('/', ctrl.getEvents);

router.get('/:id', ctrl.getEventById);

router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  createEventValidation,
  validate,
  ctrl.createEvent
);

router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  updateEventValidation,
  validate,
  ctrl.updateEvent
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  ctrl.deleteEvent
);

module.exports = router;