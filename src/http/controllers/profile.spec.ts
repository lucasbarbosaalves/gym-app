import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to access profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@hotmail.com',
      password: '123456',
    });

    const auth = await request(app.server).post('/sessions').send({
      email: 'john.doe@hotmail.com',
      password: '123456',
    });

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${auth.body.token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@hotmail.com',
      created_at: expect.any(String),
    });
  });
});
