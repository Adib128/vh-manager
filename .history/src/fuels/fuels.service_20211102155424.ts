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
      fuel =  await this.fuelModel.findById(id).populate('vehicle').exec();
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
