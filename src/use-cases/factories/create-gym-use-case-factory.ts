import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from '../create-gym';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';

export function createGymUseCase() {
  const gymRepository = new PrismaGymRepository();
  return new CreateGymUseCase(gymRepository);
}
