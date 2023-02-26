import { Module } from '@nestjs/common';
import { ServicesController } from './controller/services.controller';
import { ServicesService } from './service/services.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
})
export class ServicesModule {}
