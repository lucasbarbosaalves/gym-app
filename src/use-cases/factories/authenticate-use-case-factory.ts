import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '../authenticate';

export function authenticateUseCase() {
  const usersRepository = new InMemoryUsersRepository();
  return new AuthenticateUseCase(usersRepository);
}
