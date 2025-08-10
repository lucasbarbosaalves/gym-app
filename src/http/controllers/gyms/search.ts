import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().default(1),
  });

  const { q, page } = searchGymBodySchema.parse(request.query);

  try {
    const useCase = makeSearchGymsUseCase();

    const { gyms } = await useCase.execute({
      query: q,
      page,
    });
    return reply.status(200).send({ gyms });
  } catch (error) {
    return reply.status(500).send({
      message: 'An error occurred while searching for gyms',
    });
  }
}
