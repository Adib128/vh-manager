import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  // Create new vehicle
  async create(createVehicleDto: CreateVehicleDto) {
    try {
      return await this.prisma.vehicle.create({
        data: createVehicleDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Vehicle is already exist');
        }
      }
      throw new BadRequestException('Error on vehicle creating');
    }
  }

  // Return vehicles list
  async findAll() {
    return await this.prisma.vehicle.findMany();
  }

  // Return vehicle by ID
  async findOne(id: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    });
    if (!vehicle) {
      throw new NotFoundException(`Veicle with the ID ${id} is not found`);
    }
    return vehicle;
  }

  // Update vehilce information
  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    try {
      return await this.prisma.vehicle.update({
        where: { id },
        data: updateVehicleDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Vehicle with the ID ${id} is not found`);
        }
      }
      throw new BadRequestException('Error on vehicle updating');
    }
  }
  
  // Remove vehicle
  async remove(id: number): Promise<any> {
    try {
      return await this.prisma.vehicle.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Vehicle with the ID ${id} is not found`);
        }
      }
      throw new BadRequestException('Error on vehicle deleting');
    }
  }
}
