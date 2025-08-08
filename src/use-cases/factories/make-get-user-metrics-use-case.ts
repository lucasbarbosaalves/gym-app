import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository';
import { GetuserMetricsUseCase } from '../get-user-metrics';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new GetuserMetricsUseCase(checkInsRepository);

  return useCase;
}
