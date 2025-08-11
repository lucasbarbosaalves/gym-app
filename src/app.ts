import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { gymRoutes } from './http/controllers/gyms/routes';
import { userRoutes } from './http/controllers/users/routes';
import { checkInRoutes } from './http/controllers/check-ins/routes';
import fastifyCookie from '@fastify/cookie';

export const app = fastify();

const BAD_REQUEST_STATUS_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false, // Set to true if you want to sign the cookie
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(BAD_REQUEST_STATUS_CODE).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Enviar o log para uma ferramenta de observabilidade externa.
  }

  return reply.status(INTERNAL_SERVER_ERROR_CODE).send({
    message: 'Internal server error.',
  });
});
