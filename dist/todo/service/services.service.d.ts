import { Services } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllServices(): Promise<any[]>;
    updateServices(body: Services[]): Promise<void>;
}
