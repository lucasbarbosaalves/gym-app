import { CheckIn, Prisma } from 'generated/prisma';

export interface CheckinRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findById(id: string): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  countByUserId(userId: string): Promise<number>;
}
