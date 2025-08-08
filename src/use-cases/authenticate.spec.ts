import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { describe, expect, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate use case test behavior', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    const expectedName = 'Jonh Doe';
    const expectedEmail = 'john.doe@hotmail.com';
    const expectedPassword = '123456';

    await usersRepository.create({
      name: expectedName,
      email: expectedEmail,
      password_hash: await hash(expectedPassword, 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: expectedEmail,
      password: expectedPassword,
    });
    expect(user.name).toEqual(expectedName);
    expect(user.email).toEqual(expectedEmail);
    expect(user.password_hash).toEqual(expect.any(String));
    expect(user.id).toEqual(expect.any(String));
    expect(user.created_at).toEqual(user.created_at);
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'wrong.email@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const expectedEmail = 'john.doe@hotmail.com';
    await usersRepository.create({
      name: 'Jonh Doe',
      email: expectedEmail,
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: expectedEmail,
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
