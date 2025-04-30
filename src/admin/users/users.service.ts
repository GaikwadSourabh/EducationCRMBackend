import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./schema/users.schema";
import { Model } from "mongoose";
import { UsersDto } from "./dto/users.dto";
import * as bcrypt from "bcrypt";
import { skip } from "rxjs";



@Injectable()
export class UsersService
{
    constructor(@InjectModel(Users.name) private UsersModel:Model<Users>){}

    async create(data:UsersDto):Promise<Users>
    {
        const hasedPassword = await bcrypt.hash(data.password,10) 
        data.password=hasedPassword;
        return this.UsersModel.create(data);
    }

    async update(id:string,data:UsersDto):Promise<Users>
    {
        const users = await this.UsersModel.findByIdAndUpdate(id,data,{new:true}).exec()

        if(!users)
        {
            throw new Error('User Not Found')
        }
        return users;
    }

    async updateUserStatus(id: string, status:boolean): Promise<any> {
        return await this.UsersModel.findByIdAndUpdate(id, {ban_status:status }, { new: true }).exec();
      }
      

    async findAll(page=1,limit=5):Promise<{data:Users[],total:number}>
    {
        const skip=(page-1)*limit;
        const [data,total]=await Promise.all ([
            this.UsersModel.find().skip(skip).limit(limit).exec(),
            this.UsersModel.countDocuments()
        ]);
        return { data,total}
    }
      
}