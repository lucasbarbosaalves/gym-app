import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymRepository: InMemoryGymRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -23.5505,
      longitude: -46.6333,
    });

    await gymRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -22.9068,
      longitude: -43.1729,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms[0].title).toBe('Near Gym');
  });
});
