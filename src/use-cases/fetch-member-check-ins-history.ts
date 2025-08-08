import { CheckinRepository } from '@/repositories/check-in-repository';
import { CheckIn } from 'generated/prisma';

interface FetchUserCheckInsHistoryRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkinRepository: CheckinRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkinRepository.findManyByUserId(
      userId,
      page
    );
    return { checkIns };
  }
}
