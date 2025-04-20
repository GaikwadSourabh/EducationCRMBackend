import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeDto } from "./dto/employee.dto";
import { Employee } from "./schema/employee.schema";

@Controller('/admin/employee')
export class EmployeeController
{
   constructor(private employeeService:EmployeeService){}

   @Post()
   async create(@Body() data:EmployeeDto):Promise<Employee>
   {
     return this.employeeService.create(data);
   }

   @Get()
   async findAll(@Query('page') page:number,@Query('limit') limit:number):Promise<{ data: Employee[]; total: number; }>
   {
      return this.employeeService.findAll(Number(page) ||1, Number(limit) ||5);
   }

   @Get(':id')
   async findOne(@Param('id') id:string):Promise<Employee>
   {
      return this.employeeService.findOne(id);
   }

   @Put(':id')
   async update(@Param('id') id:string,@Body()data:EmployeeDto):Promise<Employee>
   {
    return this.employeeService.update(id,data);
   }

   @Delete(':id')
   async delete(@Param('id') id:string):Promise<Employee>
   {
    return this.employeeService.delete(id);
   }
}