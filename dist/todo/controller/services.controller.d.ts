import { Services } from '@prisma/client';
import { ServicesService } from '../service/services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    getAllTodo(): Promise<Services[]>;
    createTodo(postData: Services[]): Promise<void>;
}
