import { UsersRepository } from '@/repositories/user-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/use-already-exists-error';
import { User } from 'generated/prisma';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const emailVerification = await this.usersRepository.findByEmail(email);

    if (emailVerification) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
