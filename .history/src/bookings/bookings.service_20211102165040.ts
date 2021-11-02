import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>){}

  async create(createBookingDto: CreateBookingDto): Promise<Booking>  {
    return await new this.bookingModel(createBookingDto).save();
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingModel.find().exec();
  }

  async findOne(id: string): Promise<Booking> {
    let fuel;
    try{
      fuel =  await this.bookingModel.findById(id).populate('vehicle').populate('driver').exec();
    }catch(error){
      throw new NotFoundException(`Fuel record with the ID ${id} is not found`);
    }
    return fuel ; 
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
