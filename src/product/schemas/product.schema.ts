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
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Electronics', description: 'Product category' })
  @Prop({ default: 'Uncategorized' })
  category: string;

  @ApiProperty({ example: 10, description: 'Available quantity' })
  @Prop({ required: true })
  quantity: number;

  @ApiProperty({ example: 'ACI', description: 'Brand Name' })
  @Prop()
  brand?: string;

  @ApiProperty({ example: 'image url', description: 'Product image url' })
  @Prop()
  imageUrl?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
