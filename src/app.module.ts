import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vehicle'),
    VehiclesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
