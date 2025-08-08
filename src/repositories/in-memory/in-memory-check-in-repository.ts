import dayjs from 'dayjs';
import { CheckIn, Prisma } from 'generated/prisma';
import { CheckinRepository } from '../check-in-repository';

export class InMemoryCheckInRepository implements CheckinRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };
    this.items.push(checkIn);
    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const starOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at);
      const onSameDate =
        checkInDate.isAfter(starOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkin.user_id === userId && onSameDate;
    });
    return checkIn || null;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, 40);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id);
    return checkIn || null;
  }

  //

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
      return checkIn;
    }
    return checkIn; // If not found, return the check-in as is
  }
}
