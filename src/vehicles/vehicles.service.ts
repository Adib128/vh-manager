import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle, VehicleDocument } from '../schemas/vehicle.schema';

@Injectable()
export class VehiclesService {

  constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>){}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>  {
    return await new this.vehicleModel(createVehicleDto).save();
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    let vehicle;
    try{
      vehicle =  await this.vehicleModel.findById(id).exec();
      
    }catch(error){
      throw new NotFoundException(`Vehicle with the ID ${id} is not found`);
    }
    return vehicle ; 
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
}
