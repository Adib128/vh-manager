import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { SearchBookingDto } from './dto/search-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaClient) {}

  // Create new booking
  async create(createBookingDto: CreateBookingDto) {
    try {
      return await this.prisma.booking.create({
        data: createBookingDto,
      });
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Booking record is already exist');
        }
      }
      throw new BadRequestException('Error on booking creating');
    }
  }

  // Return booking list
  async findAll() {
    return await this.prisma.booking.findMany();
  }

  // Return by list of booking by search credentials
  async searchBooking(searchBookingDto: SearchBookingDto){
    return await this.prisma.booking.findMany({
      where: searchBookingDto
    })
  }

  // Return booking information by ID
  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { vehicle: true, customer: true, driver: true },
    });
    if (!booking) {
      throw new NotFoundException(
        `Booking record with the ID ${id} is not found`,
      );
    }
    return booking;
  }

  // Update booking record information
  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      return await this.prisma.booking.update({
        where: { id },
        data: updateBookingDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Booking record with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on booking updating');
    }
  }

  // Remove booking
  async remove(id: number): Promise<any> {
    try {
      return await this.prisma.booking.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Booking record with the ID ${id} is not found`,
          );
        }
      }
      throw new BadRequestException('Error on booking record deleting');
    }
  }
}
