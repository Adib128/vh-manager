import { Vehicle } from "@prisma/client";

export class VehicleDetails {
    vehicle: Vehicle;
    consumption : number;
    mileage: number;
}
