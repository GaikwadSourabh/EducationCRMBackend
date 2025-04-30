import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Inqury, InqurySchema } from "./schema/inqury.schema";
import { InquryController } from "./inqury.controller";
import { InquryService } from "./inqury.service";
import { FollowUpsModule } from "../follow-ups/follow-up.module";


@Module({
    imports:[FollowUpsModule,MongooseModule.forFeature([{name:Inqury.name,schema:InqurySchema}])],
    controllers:[InquryController],
    providers:[InquryService]
})
export class InquryModule{}