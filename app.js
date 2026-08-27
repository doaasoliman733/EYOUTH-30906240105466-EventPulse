require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');
const requireRole = require('./middleware/requireRole');
const eventRoutes = require('./routes/events.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

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

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

start();

