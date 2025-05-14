import { Body, Controller, Post } from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";

@Controller('/userAuth')
export class UserAuthController
{
   constructor(private userAuthService:UserAuthService){}

   @Post('login')
   async login(@Body()body:{email:string,password:string})
   {
      return this.userAuthService.validateUser(body.email,body.password)
   }
}