const router = require('express').Router();

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

const validate = require('../middleware/validate');

const {
  createEventValidation,
  updateEventValidation,
} = require('../middleware/validators');

const ctrl = require('../controllers/events.controller');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter events by category ID
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter events by city
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Return events starting from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Return events up to this date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of events per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, registrations]
 *           default: date
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search event title or description
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', ctrl.getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get('/:id', ctrl.getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - date
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference 2026
 *               description:
 *                 type: string
 *                 example: A conference about technology and innovation
 *               category:
 *                 type: string
 *                 example: 65f123456789abcdef123456
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-10-15T10:00:00.000Z
 *               city:
 *                 type: string
 *                 example: Cairo
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 100
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  createEventValidation,
  validate,
  ctrl.createEvent
);

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update an existing event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Tech Conference
 *               description:
 *                 type: string
 *                 example: Updated event description
 *               category:
 *                 type: string
 *                 example: 65f123456789abcdef123456
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-11-15T10:00:00.000Z
 *               city:
 *                 type: string
 *                 example: Cairo
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 150
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  updateEventValidation,
  validate,
  ctrl.updateEvent
);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  ctrl.deleteEvent
);

module.exports = router;