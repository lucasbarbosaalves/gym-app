import { Prisma, CheckIn } from 'generated/prisma';
import { CheckinRepository } from '../check-in-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInRepository implements CheckinRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const start = dayjs(date).startOf('date');
    const end = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: start.toDate(),
          lte: end.toDate(),
        },
      },
    });

    return checkIn;
  }

  async countByUserId(userId: string) {
    const id = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
    return id;
  }
}
