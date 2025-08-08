import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { Decimal } from 'generated/prisma/runtime/library';

let gymRepository: InMemoryGymRepository;
let gymUseCase: CreateGymUseCase;

describe('Register use case test behavior', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    gymUseCase = new CreateGymUseCase(gymRepository);
  });

  it('should be able to create a gym', async () => {
    const { gym } = await gymUseCase.execute({
      title: 'Crystal Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.7443293).toNumber(),
      longitude: new Decimal(-46.6812928).toNumber(),
    });

    expect(gym.id).toEqual(expect.any(String));
    expect(gym.title).toEqual('Crystal Gym');
    expect(gym.description).toEqual('');
    expect(gym.phone).toEqual('');
  });
});
