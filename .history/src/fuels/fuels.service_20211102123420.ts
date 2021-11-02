import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fuel, FuelDocument } from 'src/schemas/fuel.schema';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Injectable()
export class FuelsService {
  constructor(@InjectModel(Fuel.name) private fuelModel: Model<FuelDocument>){}

  async create(createFuelDto: CreateFuelDto): Promise<Fuel>  {
    return await new this.fuelModel(createFuelDto).save();
  }

  async findAll(): Promise<Fuel[]> {
    return await this.fuelModel.find().exec();
  }

  async findOne(id: string): Promise<Fuel> {
    let fuel;
    try{
      fuel =  await this.fuelModel.findById(id).exec();
    }catch(error){
      throw new NotFoundException(`Driver with the ID ${id} is not found`);
    }
    return fuel ; 
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    let driver;
    try{
      driver =  await this.driverModel.findById(id).exec();
      return await this.driverModel.findByIdAndUpdate(id, updateDriverDto, {new: true}).exec();
    }catch(error){
      throw new NotFoundException(`Driver with the ID ${id} is not found`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} fuel`;
  }
}
