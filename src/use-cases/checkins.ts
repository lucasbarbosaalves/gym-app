import { CheckinRepository } from '@/repositories/check-in-repository';
import { GymRepository } from '@/repositories/gym-repository';
import { CheckIn } from 'generated/prisma';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distante-between-coordenates';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsErrors } from './errors/max-number-of-check-ins-error';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkin: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkinRepository: CheckinRepository,
    private gymRepository: GymRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // calculate distance and validate if user is close enough to the gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KM = 0.1; // 100 metros

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date()
    );
    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsErrors();
    }
    const checkIn = await this.checkinRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkin: checkIn,
    };
  }
}
