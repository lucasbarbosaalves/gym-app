import { createGymUseCase } from '@/use-cases/factories/create-gym-use-case-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  try {
    const useCase = createGymUseCase();

    await useCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
    return reply.status(201).send({ message: 'Gym created successfully' });
  } catch (error) {
    return reply.status(500).send({
      message: 'An error occurred while creating the gym',
    });
  }
}
