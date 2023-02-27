import { Injectable } from '@nestjs/common';
import { Services } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getAllServices(): Promise<any[]> {
    const results = await this.prisma.services.findMany();
    return results.map(x => {
      try {
        return {...JSON.parse(x.info), id: x.id};
      } catch (err) {
        return {...x};
      }
    });
  }

  async updateServices(body: Services[]): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.services.deleteMany(),
      ...body.map(x => this.prisma.services.create({data: x}))
    ]);
  }
}
