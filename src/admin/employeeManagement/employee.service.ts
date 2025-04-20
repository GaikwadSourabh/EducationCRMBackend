import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Employee } from "./schema/employee.schema";
import { Model } from "mongoose";
import { EmployeeDto } from "./dto/employee.dto";
import e from "express";

@Injectable()
export class EmployeeService
{
  constructor(@InjectModel(Employee.name) private EmployeeModule:Model<Employee>){}

  async create(EmployeeData:EmployeeDto):Promise<Employee>
  {
     return this.EmployeeModule.create(EmployeeData);
  }

  async findAll(page=1,limit=5):Promise<{data:Employee[],total:number}>
  {
      const skip=(page-1)*limit;
      const [data,total]=await Promise.all([
        this.EmployeeModule.find().skip(skip).limit(limit).exec(),
        this.EmployeeModule.countDocuments()
      ]);
      return {data,total};
  }

  async findOne(id:string):Promise<Employee>
  {
    const employee = await this.EmployeeModule.findById(id).exec();

    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  }

  async update(id:string,data:EmployeeDto):Promise<Employee>
  {
    const employee = await this.EmployeeModule.findByIdAndUpdate(id,data,{new:true}).exec();
    if(!employee)
    {
        throw new Error(`Employee is id ${id} not Found`);
    }
    return employee;
  }

  async delete(id:string):Promise<Employee>
  {
    const employee = await this.EmployeeModule.findByIdAndDelete(id);
    if(!employee)
    {
        throw new Error (`Employee id ${id} is not found`);
    }
    return employee;
  }
}