import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { SearchFuelDto } from './dto/search-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Injectable()
export class FuelsService {
  constructor(private prisma: PrismaClient) {}

  // Create new fuel record
  async create(createFuelDto: CreateFuelDto) {
    try {
      return await this.prisma.fuel.create({
        data: createFuelDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Fuel record is already exist');
        }
      }
      throw new BadRequestException('Error on fuel record creating');
    }
  }

  // Return fuel records list
  async findAll() {
    return await this.prisma.fuel.findMany();
  }

  // Return fuel record informations by ID
  async findOne(id: number) {
    const fuel = await this.prisma.fuel.findUnique({
      where: { id },
      include: { vehicle: true, driver: true },
    });
    if (!fuel) {
      throw new NotFoundException(`Veicle with the ID ${id} is not found`);
    }
    return fuel;
  }

  // Search fuel record by optional data from the Dto
  async searchFuel(searchFuelDto: SearchFuelDto) {
     return await this.prisma.fuel.findMany({
       where: searchFuelDto,
     });
  }
 
  // Update fuel record information
  async update(id: number, updateFuelDto: UpdateFuelDto) {
    try {
      return await this.prisma.fuel.update({
        where: { id },
        data: updateFuelDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Fuel record with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on fuel record updating');
    }
  }

  // Remove fuel record
  async remove(id: number): Promise<any> {
    try {
      return await this.prisma.fuel.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Fuel record with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on fuel record deleting');
    }
  }
}
