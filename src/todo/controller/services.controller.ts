import {
  Body, Controller,
  Get, Post, Headers
} from '@nestjs/common';
import { Services } from '@prisma/client';
import { ServicesService } from '../service/services.service';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllTodo(): Promise<Services[]> {
    return this.servicesService.getAllServices();
  }

  @Post()
  async createTodo(@Body() postData: Services[], @Headers() header: {authorization: string}): Promise<void> {
    if (header.authorization === `Bearer ${process.env.API_KEY}`) {
      return this.servicesService.updateServices(postData);
    }
  }
}
