const router = require('express').Router();

const requireAuth = require('../middleware/requireAuth');
const validate = require('../middleware/validate');
const { registerForEventValidation } = require('../middleware/validators');
const ctrl = require('../controllers/registrations.controller');

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: Event registrations
 */

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Register for an event
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *             properties:
 *               event:
 *                 type: string
 *                 description: MongoDB ID of the event
 *                 example: 6a946f8772ef926a5dca61f3
 *     responses:
 *       201:
 *         description: Registration created successfully
 *       400:
 *         description: Already registered or event is full
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Event not found
 */
router.post(
  '/',
  requireAuth,
  registerForEventValidation,
  validate,
  ctrl.registerForEvent
);

/**
 * @swagger
 * /api/registrations/my:
 *   get:
 *     summary: Get current user's registrations
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User registrations retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get('/my', requireAuth, ctrl.getMyRegistrations);

/**
 * @swagger
 * /api/registrations/{id}:
 *   delete:
 *     summary: Cancel a registration
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the registration
 *         example: 6a948168b68b8ee0209857f5
 *     responses:
 *       200:
 *         description: Registration cancelled successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You can only cancel your own registration
 *       404:
 *         description: Registration not found
 */
router.delete('/:id', requireAuth, ctrl.cancelRegistration);

module.exports = router;