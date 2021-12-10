import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle, VehicleDocument } from '../schemas/vehicle.schema';
import { Fuel, FuelDocument } from 'src/schemas/fuel.schema';
import { VehicleDetails } from './entities/vehicle.interface';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';

@Injectable()
export class VehiclesService {

  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(Fuel.name) private fuelModel: Model<FuelDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>
  ){}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>  {
    return await new this.vehicleModel(createVehicleDto).save();
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleModel.find().exec();
  }

  async findOne(id: string):Promise<VehicleDetails> {
    let vehicle;
    let VehicleDetails;
    try{
      vehicle =  await this.vehicleModel.findById(id).exec();
      let totalConsumption = await this.totalConsumption(vehicle);
      let totalMileage = await this.totalMileage(vehicle);
      VehicleDetails = {vehicle, consumption: totalConsumption, mileage: totalMileage } ;
    }catch(error){
      throw new NotFoundException(`Vehicle with the ID ${id} is not found`);
    }
    return VehicleDetails ; 
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    let vehicle;
    try{
      vehicle =  await this.vehicleModel.findById(id).exec();
      return await this.vehicleModel.findByIdAndUpdate(id, updateVehicleDto, {new: true}).exec();
    }catch(error){
      throw new NotFoundException(`Vehicle with the ID ${id} is not found`);
    }
  }

  async remove(id: string): Promise<any> {
    let vehicle;
    try{
      vehicle =  await this.vehicleModel.findById(id).exec();
      return await this.vehicleModel.findByIdAndRemove(id).exec();
    }catch(error){
      throw new NotFoundException(`Vehicle with the ID ${id} is not found`);
    }
  }

  async totalConsumption(vehicle): Promise<number>{
    let totalConsumption = 0 ; 
    let consumption;
    try{
      consumption = await this.fuelModel.aggregate([
        {
          $match: {
            vehicle: vehicle._id
          }
        }, {
          $group: {
            _id: '$vehicle', 
            sm: {
              $sum: '$quantity'
            }
          }
        }
      ]);
      if(consumption.length != 0) totalConsumption =  consumption[0].sm;
    }catch(error){
      throw new NotFoundException(`Consumption of the Vehicle  with the ID ${vehicle._id} is not found`);
    }
    return totalConsumption;
  }

  async totalMileage(vehicle): Promise<number>{
    let totalMileage = 0 ; 
    let mileage ; 
    try{
      mileage = await this.bookingModel.aggregate([
        {
          $match: {
            vehicle: vehicle._id
          }
        }, {
          $group: {
            _id: '$vehicle', 
            sm: {
              $sum: '$distance'
            }
          }
        }
      ]);
      if(mileage.length != 0) totalMileage = mileage[0].sm ; 
    }catch(error){
      throw new NotFoundException(`Mileage of the Vehicle  with the ID ${vehicle._id} is not found`);
    }
    return totalMileage;
  }

}
