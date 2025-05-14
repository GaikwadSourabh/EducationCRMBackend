import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/admin/users/schema/users.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAuthService
{
    constructor(@InjectModel(Users.name) private userModel:Model<Users>,private jwtService:JwtService){}

    async validateUser(email:string,password:string):Promise<any>
    {
     const user = await this.userModel.findOne({email}).lean();
     
     // check user is present or not
     if(!user)
     {
        throw new UnauthorizedException('User Not Found');
     }
      // check user ban or not ban
     if (user.ban_status) {
      throw new ForbiddenException('You are banned. Please contact admin.');
     }

     const isMatch= await bcrypt.compare(password,user.password);

     if(!isMatch)
     {
        throw new UnauthorizedException('Invalid Credintials')
     }

     const payload = {sub:user._id,email:user.email,ban_status:user.ban_status};
     const access_token = this.jwtService.sign(payload);

     return {access_token,user};

    }
}