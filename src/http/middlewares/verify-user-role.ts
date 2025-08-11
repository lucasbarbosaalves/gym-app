import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(role: 'MEMBER' | 'ADMIN') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== role) {
      return reply.status(403).send({ message: 'Unauthorized' });
    }
  };
}
