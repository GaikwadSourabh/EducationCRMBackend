import { UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Users } from "src/admin/users/schema/users.schema";


export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt')
{
   constructor(@InjectModel(Users.name) private userModel:Model<Users>){
       super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey',
       });
   }

   async validate(payload:any)
   {
     const {email}=payload;

     const user =  await this.userModel.findOne({email}).lean();

     if(!user)
     {
        return new UnauthorizedException('Users Not Found');
     }

     return {userId:user._id,email:user.email,ban_status:user.ban_status};
   }
}