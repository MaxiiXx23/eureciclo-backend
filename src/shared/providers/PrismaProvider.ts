import { PrismaClient } from '@prisma/client'

export class PrismaProvider {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async queryDatabase<T>(
    query: (prisma: PrismaClient) => Promise<T>,
  ): Promise<T> {
    try {
      return await query(this.prisma)
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
