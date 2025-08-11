import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a Gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym A',
        description: 'Description for Gym A',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      });

    expect(response.statusCode).toEqual(201);
  });
});
