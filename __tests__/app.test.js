const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('registers a new user on POST', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'jojo@defense.gov', password: 'codobyjojo' });

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'jojo@defense.gov',
    });
  });

  it('signs in an existing user on POST to /sessions', async () => {
    const credentials = { email: 'jojo@defense.gov', password: 'codobyjojo' };

    const user = await UserService.create(credentials);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send(credentials);

    expect(res.body).toEqual({ message: 'Signed in successfully', user });
  });

  it('logs out a user on DELETE', async () => {
    const agent = request.agent(app);

    const credentials = { email: 'jojo@defense.gov', password: 'codobyjojo' };

    const user = await UserService.create(credentials);
    let res = await agent.post('/api/v1/users/sessions').send(credentials);

    expect(res.body).toEqual({ message: 'Signed in successfully', user });

    res = await agent.delete('/api/v1/users/sessions');

    expect(res.body).toEqual({ message: 'Logged out successfully' });
  });
});
