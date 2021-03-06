import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  // Create new driver
  async create(createDriverDto: CreateDriverDto) {
    try {
      return await this.prisma.driver.create({
        data: createDriverDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Driver is already exist');
        }
      }
      throw new BadRequestException('Error on driver creating');
    }
  }

  // Return drivers list
  async findAll() {
    return await this.prisma.driver.findMany();
  }

  // Return driver by ID
  async findOne(id: number) {
    const driver = await this.prisma.driver.findUnique({
      where: {
        id,
      },
    });
    if (!driver) {
      throw new NotFoundException(`Driver with the ID ${id} is not found`);
    }
    return driver;
  }

  // Update driver information
  async update(id: number, updateDriverDto: UpdateDriverDto) {
    try {
      return await this.prisma.driver.update({
        where: { id },
        data: updateDriverDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Driver with the ID ${id} is not found`);
        }
      }
      throw new BadRequestException('Error on driver updating');
    }
  }

  // Remove driver
  async remove(id: number) {
    try {
      return await this.prisma.driver.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Driver with the ID ${id} is not found`);
        }
      }
      throw new BadRequestException('Error on driver deleting');
    }
  }
}
