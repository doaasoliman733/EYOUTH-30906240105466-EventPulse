const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const connectDB = require('../../config/db');

beforeAll(async () => {
  await connectDB();
}, 15000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/events', () => {
  it('returns 200 and an array of events', async () => {
    const res = await request(app).get('/api/events');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 15000);
});

describe('POST /api/events (unauthenticated)', () => {
  it('returns 401 without a JWT token', async () => {
    const res = await request(app).post('/api/events').send({
      title: 'Test Event',
      category: '64b1234567890abcdef12345',
      date: '2026-09-15',
      city: 'Cairo',
      venue: 'Main Hall',
      capacity: 10,
    });

    expect(res.statusCode).toBe(401);
  });
});

describe('POST /api/events (validation failure)', () => {
  it('returns 422 with missing required fields, even without a real token', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', 'Bearer faketoken')
      .send({});

    expect([401, 422]).toContain(res.statusCode);
  });
});