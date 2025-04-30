import { Body, Controller, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDto } from "./dto/users.dto";
import { Users } from "./schema/users.schema";
import * as bcrypt from "bcrypt";
import { ParseBoolPipe } from "./pipes/parse-bool.pipe";

@Controller('/users')
export class UsersController
{
  constructor(private usersService:UsersService){}

  @Post()
   async create(@Body()data:UsersDto):Promise<Users>
   {
      return this.usersService.create(data);
   }

   @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status',ParseBoolPipe) status: boolean) {
    return this.usersService.updateUserStatus(id, status);
}

   @Get()
   async findAll(@Query('page') page:number,@Query('limit')limit:number):Promise<{data:Users[],total:number}>
   {
     return this.usersService.findAll(Number(page)||1,Number(limit)||5);
   }

   @Put(':id')
   async update(@Param('id') id:string,@Body()data:UsersDto):Promise<Users>
   {
     return this.usersService.update(id,data);
   }
}