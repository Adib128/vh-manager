import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private fuelModel: Model<BookingDocument>){}

  async create(createBookingDto: CreateBookingDto): Promise<Booking>  {
    return await new this.fuelModel(createBookingDto).save();
  }

  async findAll(): Promise<Booking[]> {
    return await this.fuelModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}