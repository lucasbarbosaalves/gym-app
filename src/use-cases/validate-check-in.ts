import { CheckinRepository } from '@/repositories/check-in-repository';
import { CheckIn } from 'generated/prisma';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface ValidateCheckInUseCaseRequest {
  checkinId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkin: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkinRepository: CheckinRepository) {}

  async execute({
    checkinId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkin = await this.checkinRepository.findById(checkinId);

    if (!checkin) {
      throw new ResourceNotFoundError();
    }

    checkin.validated_at = new Date();
    if (
      checkin.validated_at.getTime() - checkin.created_at.getTime() >
      1000 * 60 * 20
    ) {
      throw new Error(
        'Check-in can only be validated within 20 minutes of its creation'
      );
    }

    await this.checkinRepository.save(checkin);

    return {
      checkin,
    };
  }
}
