import { Body, Controller, Post } from "@nestjs/common";
import { employeeAuthService } from "./employee-auth.service";

@Controller('employee-auth')
export class EmployeeAuthController
{

    constructor(private emploeeAuthService:employeeAuthService){}

  @Post('login')
  async login(@Body()body:{email:string,password:string})
  {
     return this.emploeeAuthService.validateEmployee(body.email,body.password); 
  }

}