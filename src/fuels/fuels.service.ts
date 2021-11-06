import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from 'src/schemas/driver.schema';
import { Fuel, FuelDocument } from 'src/schemas/fuel.schema';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Injectable()
export class FuelsService {
  constructor(
    @InjectModel(Fuel.name) private fuelModel: Model<FuelDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(Driver.name) private drivereModel: Model<DriverDocument>
  ){}

  async create(createFuelDto: CreateFuelDto): Promise<Fuel>  {
    return await new this.fuelModel(createFuelDto).save();
  }

  async findAll(): Promise<Fuel[]> {
    return await this.fuelModel.find().exec();
  }

  async findByVehicle(vehicleId: string): Promise<Fuel[]> {
    let fuel;
    try{
      let vehicle = await this.vehicleModel.findById(vehicleId).exec();
      fuel =  await this.fuelModel.find({'vehicle' : vehicle}).exec();
    }catch(error){
      throw new NotFoundException(`Fuel record with the vehicle ID ${vehicleId} is not found`);
    }
    return fuel ; 
  }

  async findByDriver(driverId: string): Promise<Fuel[]> {
    let fuel;
    try{
      let driver = await this.drivereModel.findById(driverId).exec();
      fuel =  await this.fuelModel.find({'driver' : driver}).exec();
    }catch(error){
      throw new NotFoundException(`Fuel record with the driver ID ${driverId} is not found`);
    }
    return fuel ; 
  }

  async findOne(id: string): Promise<Fuel> {
    let fuel;
    try{
      fuel =  await this.fuelModel.findById(id).populate('vehicle').populate('driver').exec();
    }catch(error){
      throw new NotFoundException(`Fuel record with the ID ${id} is not found`);
    }
    return fuel ; 
  }

  async update(id: string, updateFuelDto: UpdateFuelDto): Promise<Fuel> {
    let fuel;
    try{
      fuel =  await this.fuelModel.findById(id).exec();
      return await this.fuelModel.findByIdAndUpdate(id, updateFuelDto, {new: true}).exec();
    }catch(error){
      throw new NotFoundException(`Fuel record the ID ${id} is not found`);
    }
  }

  async remove(id: string): Promise<any> {
    let fuel;
    try{
      fuel =  await this.fuelModel.findById(id).exec();
      return await this.fuelModel.findByIdAndRemove(id).exec();
    }catch(error){
      throw new NotFoundException(`Fuel record with the ID ${id} is not found`);
    }
  }
}
