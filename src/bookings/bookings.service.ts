import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from  '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { Driver, DriverDocument } from 'src/schemas/driver.schema';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private httpService: HttpService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return await new this.bookingModel(createBookingDto).save();
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingModel.find().exec();
  }

  async findByVehicle(vehicleId: string): Promise<Booking[]> {
    let bookings;
    try {
      let vehicle = await this.vehicleModel.findById(vehicleId).exec();
      bookings = await this.bookingModel.find({ vehicle: vehicle }).exec();
    } catch (error) {
      throw new NotFoundException(
        `Bookings with the vehicle ID ${vehicleId} is not found`,
      );
    }
    return bookings;
  }

  async findByDriver(driverId: string): Promise<Booking[]> {
    let bookings;
    try {
      let driver = await this.driverModel.findById(driverId).exec();
      bookings = await this.bookingModel.find({ driver: driver }).exec();
    } catch (error) {
      throw new NotFoundException(
        `Bookings with the vehicle ID ${driverId} is not found`,
      );
    }
    return bookings;
  }

  async findByCustomer(customerId: string): Promise<Booking[]> {
    let bookings;
    try {
      let customer = await this.customerModel.findById(customerId).exec();
      bookings = await this.bookingModel.find({ customer: customer }).exec();
    } catch (error) {
      throw new NotFoundException(
        `Bookings with the customer ID ${customerId} is not found`,
      );
    }
    return bookings;
  }

  async findOne(id: string): Promise<Booking> {
    let booking;
    try {
      booking = await this.bookingModel
        .findById(id)
        .populate('vehicle')
        .populate('driver')
        .populate('customer')
        .exec();
    } catch (error) {
      throw new NotFoundException(`Booking with the ID ${id} is not found`);
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    let booking;
    try {
      booking = await this.bookingModel.findById(id).exec();
      return await this.bookingModel
        .findByIdAndUpdate(id, updateBookingDto, { new: true })
        .exec();
    } catch (error) {
      throw new NotFoundException(`Booking with the ID ${id} is not found`);
    }
  }

  async remove(id: string): Promise<any> {
    let booking;
    try {
      booking = await this.bookingModel.findById(id).exec();
      return await this.bookingModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new NotFoundException(`Booking with the ID ${id} is not found`);
    }
  }
}
