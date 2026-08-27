const AppError = require('../../utils/appError');

describe('AppError', () => {
  it('sets statusCode and status = "fail" for 4xx errors', () => {
    const err = new AppError('Not found', 404);

    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
  });

  it('sets status = "error" for 5xx errors', () => {
    const err = new AppError('Server error', 500);

    expect(err.status).toBe('error');
  });

  it('defaults isOperational to true', () => {
    const err = new AppError('Something failed', 400);

    expect(err.isOperational).toBe(true);
  });

  it('is an instance of the native Error class', () => {
    const err = new AppError('Oops', 400);

    expect(err).toBeInstanceOf(Error);
  });
});