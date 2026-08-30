require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');
const requireRole = require('./middleware/requireRole');
const eventRoutes = require('./routes/events.routes');
const registrationRoutes = require('./routes/registrations.routes');
const announcementRoutes = require('./routes/announcements.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join-event', (eventId) => {
    socket.join(eventId);
    console.log(`Socket ${socket.id} joined event room ${eventId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/announcements', announcementRoutes);

// Test protected route
app.get('/api/auth/test', requireAuth, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'You are authenticated',
    user: req.user,
  });
});

// Test admin-only route
app.get(
  '/api/auth/admin-test',
  requireAuth,
  requireRole('admin'),
  (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'You are an admin',
    });
  }
);

app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    database: dbStatus,
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  });
});

// Error handler — MUST be last
app.use(errorHandler);

async function start() {
  await connectDB();

  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;