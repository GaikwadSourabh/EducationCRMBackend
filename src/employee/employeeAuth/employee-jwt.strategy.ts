import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/admin/employeeManagement/schema/employee.schema'; 
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class EmployeeJwtStrategy extends PassportStrategy(Strategy, 'employee-jwt') 
{
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', 
    });
  }

  async validate(payload: any) {
    const { email } = payload; 

    const employee = await this.employeeModel.findOne({ email }).lean();
    if (!employee) {
      throw new UnauthorizedException('Employee not found');
    }

    return { employeeId: employee._id, email: employee.email, role: payload.role };
  }
}
