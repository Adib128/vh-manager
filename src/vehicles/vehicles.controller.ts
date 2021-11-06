import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('vehicles')
@ApiTags('Vehicle')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async findAll() {
    return await this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.vehiclesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
