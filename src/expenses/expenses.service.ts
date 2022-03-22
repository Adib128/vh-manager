import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaClient) {}

  // Create new expense record
  async create(createExpenseDto: CreateExpenseDto) {
    try {
      return await this.prisma.expense.create({
        data: createExpenseDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Expense record is already exist');
        }
      }
      throw new BadRequestException('Error on expense record creating');
    }
  }

  // Return expense records list
  async findAll() {
    return await this.prisma.expense.findMany();
  }

  // Return expense record information by ID
  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: { vehicle: true },
    });
    if (!expense) {
      throw new NotFoundException(
        `Expense record with the ID ${id} is not found`,
      );
    }
    return expense;
  }

  // Update expense record information
  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    try {
      return await this.prisma.expense.update({
        where: { id },
        data: updateExpenseDto
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Expense record with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on expense record updating');
    }
  }

  // Remove expense record
  async remove(id: number): Promise<any> {
    try {
      return await this.prisma.expense.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Expense record with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on expense record deleting');
    }
  }
}
