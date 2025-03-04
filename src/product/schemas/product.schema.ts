import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @ApiProperty({
    example: '1234567890123',
    description: 'The barcode of the product',
  })
  @Prop({ required: true, unique: true })
  barcode: string;

  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @Prop({ required: false })
  name?: string;

  @ApiProperty({ example: 'Electronics', description: 'Product category' })
  @Prop({ default: 'Uncategorized' })
  category: string;

  @ApiProperty({ example: 'Material Number', description: 'Brand Name' })
  @Prop()
  material?: number;

  @ApiProperty({ example: '2022-01-01', description: 'Release Date' })
  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
