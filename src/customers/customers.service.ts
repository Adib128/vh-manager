import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>){}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer>  {
    return await new this.customerModel(createCustomerDto).save();
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    let customer;
    try{
      customer =  await this.customerModel.findById(id).exec();
    }catch(error){
      throw new NotFoundException(`Customer with the ID ${id} is not found`);
    }
    return customer ; 
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    let customer;
    try{
      customer =  await this.customerModel.findById(id).exec();
      return await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, {new: true}).exec();
    }catch(error){
      throw new NotFoundException(`Customer with the ID ${id} is not found`);
    }
  }

  async remove(id: string): Promise<any> {
    let customer;
    try{
      customer =  await this.customerModel.findById(id).exec();
      return await this.customerModel.findByIdAndRemove(id).exec();
    }catch(error){
      throw new NotFoundException(`Customer with the ID ${id} is not found`);
    }
  }
}
