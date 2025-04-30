import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Employee, EmployeeSchema } from "src/admin/employeeManagement/schema/employee.schema";
import { EmployeeAuthController } from "./employee-auth.controller";
import { employeeAuthService } from "./employee-auth.service";
import { EmployeeJwtStrategy } from "./employee-jwt.strategy";
import { PassportModule } from "@nestjs/passport";


@Module({
    imports:[
        JwtModule.register({
            secret:'secret',
            signOptions:{expiresIn:'1d'}
        }),
        PassportModule,
        MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),

    ],
    controllers:[EmployeeAuthController],
    providers:[employeeAuthService,EmployeeJwtStrategy],
    exports:[employeeAuthService]
})

export class EmployeeAuthModule{}