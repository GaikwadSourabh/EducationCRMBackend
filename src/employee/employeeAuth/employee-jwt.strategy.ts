import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/admin/employeeManagement/schema/employee.schema'; // adjust path
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class EmployeeJwtStrategy extends PassportStrategy(Strategy, 'employee-jwt') {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>, // Inject your Employee model to verify employee existence
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', // Make sure the secret matches the one in your authService
    });
  }

  async validate(payload: any) {
    const { email } = payload; // Extract email from payload

    // Check if the employee exists in the database
    const employee = await this.employeeModel.findOne({ email }).lean();
    if (!employee) {
      throw new UnauthorizedException('Employee not found');
    }

    // Return the employee data to be added to the request object
    return { employeeId: employee._id, email: employee.email, role: payload.role };
  }
}
