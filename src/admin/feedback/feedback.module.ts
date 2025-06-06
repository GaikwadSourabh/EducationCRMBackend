import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Feedback, FeedBackSchema } from "./schema/feedback.schema";
import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";




@Module({
    imports:[MongooseModule.forFeature([{name:Feedback.name,schema:FeedBackSchema}])],
    controllers:[FeedbackController],
    providers:[FeedbackService]
})
export class FeedbackModule{}