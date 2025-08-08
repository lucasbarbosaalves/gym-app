import { CheckinRepository } from '@/repositories/check-in-repository';

interface GetuserMetricsUseCaseRequest {
  userId: string;
}

interface GetuserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetuserMetricsUseCase {
  constructor(private checkinRepository: CheckinRepository) {}

  async execute({
    userId,
  }: GetuserMetricsUseCaseRequest): Promise<GetuserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkinRepository.countByUserId(userId);
    return { checkInsCount };
  }
}
