import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { RegisterUseCase } from '../register';

export function createRegisterUseCase() {
  const usersRepository = new InMemoryUsersRepository();
  return new RegisterUseCase(usersRepository);
}
