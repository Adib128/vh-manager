import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelsService } from './fuels.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Controller('fuels')
export class FuelsController {
  constructor(private readonly fuelsService: FuelsService) {}

  @Post()
  create(@Body() createFuelDto: CreateFuelDto) {
    return this.fuelsService.create(createFuelDto);
  }

  @Get()
  findAll() {
    return this.fuelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuelDto: UpdateFuelDto) {
    return this.fuelsService.update(+id, updateFuelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelsService.remove(+id);
  }
}
