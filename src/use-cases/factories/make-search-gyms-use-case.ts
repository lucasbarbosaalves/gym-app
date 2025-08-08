import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { SearchGymUseCase } from '../search-gyms';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymRepository();
  const useCase = new SearchGymUseCase(gymsRepository);

  return useCase;
}
