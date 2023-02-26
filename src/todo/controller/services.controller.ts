import {
  Body, Controller,
  Get, Post
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
  async createTodo(@Body() postData: Services[]): Promise<void> {
    return this.servicesService.updateServices(postData);
  }

  // @Get(':id')
  // async getTodo(@Param('id') id: number): Promise<Todo | null> {
  //   return this.todoService.getTodo(id);
  // }

  // @Put(':id')
  // async Update(@Param('id') id: number): Promise<Todo> {
  //   return this.todoService.updateTodo(id);
  // }

  // @Delete(':id')
  // async Delete(@Param('id') id: number): Promise<Todo> {
  //   return this.todoService.deleteTodo(id);
  // }
}
