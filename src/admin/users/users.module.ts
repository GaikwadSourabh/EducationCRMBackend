import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schema/users.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";


@Module({
    imports:[MongooseModule.forFeature([{name:Users.name,schema:UsersSchema}])],
    providers:[UsersService],
    controllers:[UsersController]
})
export class UsersModule{}