import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from '../create-gym';

export function createGymUseCase() {
  const gymRepostiory = new InMemoryGymRepository();
  return new CreateGymUseCase(gymRepostiory);
}
