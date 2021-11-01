import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from 'src/schemas/driver.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<DriverDocument>){}
  
  async create(createDriverDto: CreateDriverDto): Promise<Driver>  {
    return await new this.driverModel(createCustomerDto).save();
  }

  async findAll(): Promise<Customer[]> {
    return await this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    let customer;
    try{
      customer =  await this.driverModel.findById(id).exec();
    }catch(error){
      throw new NotFoundException(`Customer with the ID ${id} is not found`);
    }
    return customer ; 
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    let customer;
    try{
      customer =  await this.driverModel.findById(id).exec();
      return await this.driverModel.findByIdAndUpdate(id, updateCustomerDto, {new: true}).exec();
    }catch(error){
      throw new NotFoundException(`Customer with the ID ${id} is not found`);
    }
  }

  async remove(id: string): Promise<any> {
    let customer;
    try{
      customer =  await this.driverModel.findById(id).exec();
      return await this.driverModel.findByIdAndRemove(id).exec();
    }catch(error){
      throw new NotFoundException(`Customer with the ID ${id} is not found`);
    }
  }

}
