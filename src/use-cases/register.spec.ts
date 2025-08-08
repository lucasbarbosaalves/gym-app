import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserAlreadyExistsError } from './errors/use-already-exists-error';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe('Register use case test behavior', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const expectedName = 'Jonh Doe';
    const expectedEmail = 'john.doe@hotmail.com';
    const expectedPassword = '123456';

    const { user } = await registerUseCase.execute({
      name: expectedName,
      email: expectedEmail,
      password: expectedPassword,
    });

    expect(user.name).toEqual(expectedName);
    expect(user.email).toEqual(expectedEmail);
    expect(user.password_hash).toEqual(expect.any(String));
    expect(user.id).toEqual(expect.any(String));
    expect(user.created_at).toEqual(user.created_at);
  });

  it('should hashed user password upon registration', async () => {
    const expectedName = 'Jonh Doe';
    const expectedEmail = 'john.doe@hotmail.com';
    const expectedPassword = '123456';
    const { user } = await registerUseCase.execute({
      name: expectedName,
      email: expectedEmail,
      password: expectedPassword,
    });

    const isPasswordCorrectlyHased = await compare(
      expectedPassword,
      user.password_hash
    );

    expect(isPasswordCorrectlyHased).toBe(true);
    expect(user.name).toEqual(expectedName);
    expect(user.email).toEqual(expectedEmail);
  });

  it('should not be able to register with same email twice', async () => {
    const expectedName = 'Jonh Doe';
    const expectedEmail = 'john.doe@hotmail.com';
    const expectedPassword = '123456';

    const { user } = await registerUseCase.execute({
      name: expectedName,
      email: expectedEmail,
      password: expectedPassword,
    });

    await expect(() =>
      registerUseCase.execute({
        name: expectedName,
        email: expectedEmail,
        password: expectedPassword,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    expect(user.name).toEqual(expectedName);
    expect(user.email).toEqual(expectedEmail);
    expect(user.password_hash).toEqual(expect.any(String));
  });
});
