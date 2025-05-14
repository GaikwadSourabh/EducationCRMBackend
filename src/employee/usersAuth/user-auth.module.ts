import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Employee, EmployeeSchema } from "src/admin/employeeManagement/schema/employee.schema";
import { PassportModule } from "@nestjs/passport";
import { Users, UsersSchema } from "src/admin/users/schema/users.schema";
import { UserAuthController } from "./user-auth.controller";
import { UserAuthService } from "./user-auth.service";
import { UserJwtStrategy } from "./user-jwt.strategy";


@Module({
    imports:[
        JwtModule.register({
            secret:'secret',
            signOptions:{expiresIn:'1d'}
        }),
        PassportModule,
        MongooseModule.forFeature([{ name: Users.name, schema:UsersSchema}]),

    ],
    controllers:[UserAuthController],
    providers:[UserAuthService,UserJwtStrategy],
    exports:[UserAuthService]
})

export class UsersAuthModule{}