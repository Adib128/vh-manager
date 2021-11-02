import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fuel, FuelDocument } from 'src/schemas/fuel.schema';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Injectable()
export class FuelsService {
  constructor(@InjectModel(Fuel.name) private fuelModel: Model<FuelDocument>){}

  async create(createDriverDto: CreateDriverDto): Promise<Driver>  {
    return await new this.driverModel(createDriverDto).save();
  }

  findAll() {
    return `This action returns all fuels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuel`;
  }

  update(id: number, updateFuelDto: UpdateFuelDto) {
    return `This action updates a #${id} fuel`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuel`;
  }
}
