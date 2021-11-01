import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from 'src/schemas/driver.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<DriverDocument>){}
  
  async create(createDriverDto: CreateDriverDto): Promise<Driver>  {
    return await new this.driverModel(createDriverDto).save();
  }

  async findAll(): Promise<Driver[]> {
    return await this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<Driver> {
    let driver;
    try{
      driver =  await this.driverModel.findById(id).exec();
    }catch(error){
      throw new NotFoundException(`Driver with the ID ${id} is not found`);
    }
    return driver ; 
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    let Driver;
    try{
      Driver =  await this.driverModel.findById(id).exec();
      return await this.driverModel.findByIdAndUpdate(id, updateDriverDto, {new: true}).exec();
    }catch(error){
      throw new NotFoundException(`Driver with the ID ${id} is not found`);
    }
  }

  async remove(id: string): Promise<any> {
    let Driver;
    try{
      Driver =  await this.driverModel.findById(id).exec();
      return await this.driverModel.findByIdAndRemove(id).exec();
    }catch(error){
      throw new NotFoundException(`Driver with the ID ${id} is not found`);
    }
  }

}
