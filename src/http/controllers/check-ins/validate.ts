import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkId: z.uuid(),
  });

  const { checkId } = validateCheckInParamsSchema.parse(request.params);

  const useCase = makeValidateCheckInUseCase();

  await useCase.execute({
    checkinId: checkId,
  });

  return reply.status(204).send();
}
