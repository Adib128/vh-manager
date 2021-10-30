import { Injectable } from '@nestjs/common';
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
    return await this.vehicleModel.findById(id).exec();
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return await this.vehicleModel.findByIdAndUpdate(id, updateVehicleDto, {new: true}).exec();
  }

  async remove(id: string): Promise<any> {
    return await this.vehicleModel.findByIdAndRemove(id).exec();
  }
}
