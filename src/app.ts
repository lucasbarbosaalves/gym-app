import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { appRoutes } from './http/routes';

export const app = fastify();

const BAD_REQUEST_STATUS_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;

app.register(appRoutes);

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
