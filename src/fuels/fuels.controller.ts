import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, HttpCode } from '@nestjs/common';
import { FuelsService } from './fuels.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SearchFuelDto } from './dto/search-fuel.dto';

@Controller('fuels')
@UseGuards(JwtAuthGuard)
@ApiTags('Fuel')
@ApiBearerAuth('access-token')
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

  @Post('/search')
  @HttpCode(200)
  findByVehicle(@Body() searchFuelDto : SearchFuelDto) {
    return this.fuelsService.searchFuel(searchFuelDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFuelDto: UpdateFuelDto) {
    return this.fuelsService.update(+id, updateFuelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelsService.remove(+id);
  }
}
