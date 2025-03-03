import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: 'testuser', description: 'The username of the user' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'The user password',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'admin', description: 'User role (admin/user)' })
  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
