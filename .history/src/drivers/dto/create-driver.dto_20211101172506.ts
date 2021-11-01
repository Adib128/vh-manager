export class CreateDriverDto {
    @Prop()
    registrationNumber: string;
  
    @Prop()
    name: string;
  
    @Prop()
    email: string;
  
    @Prop()
    phoneNumber: number;
    
    @Prop()
    licenseNo: number;
  
    @Prop()
    expDate: Date;
}
