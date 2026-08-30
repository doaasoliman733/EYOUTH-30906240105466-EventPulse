const router = require('express').Router();

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const ctrl = require('../controllers/announcements.controller');

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Event announcements
 */

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     summary: Create an announcement
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - text
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: MongoDB ID of the event
 *                 example: 6a946f8772ef926a5dca61f3
 *               text:
 *                 type: string
 *                 description: Announcement message
 *                 example: The event will begin at 6 PM.
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *       400:
 *         description: eventId and text are required
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 */
router.post('/', requireAuth, requireRole('admin'), ctrl.createAnnouncement);

/**
 * @swagger
 * /api/announcements/{eventId}:
 *   get:
 *     summary: Get announcements for an event
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the event
 *         example: 6a946f8772ef926a5dca61f3
 *     responses:
 *       200:
 *         description: Announcements retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get('/:eventId', requireAuth, ctrl.getAnnouncements);

module.exports = router;