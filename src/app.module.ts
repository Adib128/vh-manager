import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CustomersModule } from './customers/customers.module';
import { DriversModule } from './drivers/drivers.module';
import { FuelsModule } from './fuels/fuels.module';
import { BookingsModule } from './bookings/bookings.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    VehiclesModule,
    CustomersModule,
    DriversModule,
    FuelsModule,
    BookingsModule,
    ExpensesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
