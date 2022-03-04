import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // Create new customer
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      return await this.prisma.customer.create({
        data: createCustomerDto,
      });
    } catch (e) {
      // Check if error is coming from prisma client
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Check if customer exists by the error code P2002
        if (e.code === 'P2002') {
          throw new ConflictException('Customer is already exist');
        }
      }
      throw new BadRequestException('Error on customer creating');
    }
  }

  // Return customers list
  async findAll() {
    return await this.prisma.customer.findMany();
  }

  // Return customer by ID
  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
    // Check if the selected customer is null and throw not found exception
    if (!customer) {
      throw new NotFoundException(`Customer with the ID ${id} is not found`);
    }
    return customer;
  }

  // Update customer information
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
      });
    } catch (e) {
      // Check if error is coming from prisma client
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Check if customer found by the error code P2025
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Customer with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on customer updating');
    }
  }

  // Remove customer
  async remove(id: number) {
    try {
      return await this.prisma.customer.delete({
        where: { id },
      });
    } catch (e) {
      // Check if error is coming from prisma client
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Check if customer found by the error code P2025
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Customer with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on customer deleting');
    }
  }
}
