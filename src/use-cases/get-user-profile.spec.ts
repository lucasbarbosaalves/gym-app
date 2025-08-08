import { describe, it, beforeEach, expect } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Get user profile use case test behavior', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const expectedName = 'Jonh Doe';
    const expectedEmail = 'johndoe@example.com';

    const userCreated = await usersRepository.create({
      name: expectedName,
      email: expectedEmail,
      password_hash: await hash('123456', 6),
    });

    const { user } = await getUserProfileUseCase.execute({
      userId: userCreated.id,
    });

    expect(user.name).toEqual(expectedName);
    expect(user.email).toEqual(expectedEmail);
    expect(user.password_hash).toEqual(expect.any(String));
    expect(user.id).toEqual(userCreated.id);
    expect(user.created_at).toEqual(userCreated.created_at);
  });

  it('should not be able to get user profile with non-existing user', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
