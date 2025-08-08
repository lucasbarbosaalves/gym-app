import { Gym, Prisma } from 'generated/prisma';

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymRepository {
  findById(id: string): Promise<Gym | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
}
