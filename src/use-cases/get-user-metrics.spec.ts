import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetuserMetricsUseCase } from './get-user-metrics';

let checkInRepository: InMemoryCheckInRepository;
let sut: GetuserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new GetuserMetricsUseCase(checkInRepository);
  });

  it('should be able to fetch check-in history', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
