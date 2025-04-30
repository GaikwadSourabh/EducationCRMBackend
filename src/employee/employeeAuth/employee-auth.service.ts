import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee } from "src/admin/employeeManagement/schema/employee.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class employeeAuthService
{

    constructor(@InjectModel(Employee.name) private employeeModule:Model<Employee>,private jwtService:JwtService){}

  async validateEmployee(email:string,password:string):Promise<any>
  {
    const employee = await this.employeeModule.findOne({email}).lean();
    if(!employee)
    {
        throw new UnauthorizedException('Employee Not Found')
    }
    const isMatch= await bcrypt.compare(password,employee.password)

    if(!isMatch)
    {
        throw new UnauthorizedException('Invalid Credintials')
    }

    const payload ={sub:employee._id,email:employee.email,role:'employee'};
    const access_token =this.jwtService.sign(payload)

    return { access_token,employee};
  }
}