import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StudySessionDocument = StudySessionEntity & Document

@Schema()
export class StudySessionEntity {
  @Prop({index: true})
  userId: string;
  @Prop({index: true})
  courseId: string;
  @Prop({index: true, unique: true})
  sessionId: string;
  @Prop()
  totalModulesStudied: number;
  @Prop()
  averageScore: number;
  @Prop()
  timeStudied: number;
}

export const StudySessionSchema = SchemaFactory.createForClass(StudySessionEntity);