import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>
    ){}
  
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense>  {
    return await new this.expenseModel(createExpenseDto).save();
  }

  async findAll() {
    return await this.expenseModel.find().exec();
  }

  async findOne(id: string): Promise<Expense> {
    let expense;
    try {
      expense = await this.expenseModel
        .findById(id)
        .populate('vehicle')
        .exec();
    } catch (error) {
      throw new NotFoundException(`Expense with the ID ${id} is not found`);
    }
    return expense;
  }
  async findByVehicle(vehicleId: string): Promise<Expense> {
    let expenses;
    try {
      let vehicle = await this.vehicleModel.findById(vehicleId).exec();
      expenses = await this.expenseModel.find({ vehicle: vehicle }).exec();
    } catch (error) {
      throw new NotFoundException(
        `Bookings with the vehicle ID ${vehicleId} is not found`,
      );
    }
    return expenses;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    let expense;
    try{
      expense =  await this.expenseModel.findById(id).exec();
      return await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, {new: true}).exec();
    }catch(error){
      throw new NotFoundException(`Expense with the ID ${id} is not found`);
    }
  }

  async remove(id: string) {
    let expense;
    try{
      expense =  await this.expenseModel.findById(id).exec();
      return await this.expenseModel.findByIdAndRemove(id).exec();
    }catch(error){
      throw new NotFoundException(`Expense with the ID ${id} is not found`);
    }
  }
}
