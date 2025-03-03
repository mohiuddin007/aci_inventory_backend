import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // 1. Fetch product details from external API
  async fetchProductByBarcode(barcode: string): Promise<Product> {
    try {
      const response = await axios.get(
        `https://products-test-aci.onrender.com/product/${barcode}`,
      );
      if (!response.data)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

      // Save the product in MongoDB under 'Uncategorized'
      const product = new this.productModel({
        barcode,
        name: response.data.name,
        brand: response.data.brand,
        category: 'Uncategorized',
        imageUrl: response.data.image,
      });

      return product.save();
    } catch (error) {
      console.log(error);
      throw new HttpException('Error fetching product', HttpStatus.BAD_REQUEST);
    }
  }

  // 2. Add product manually
  async addProduct(productData: Partial<Product>): Promise<Product> {
    const product = new this.productModel({
      ...productData,
      category: 'Uncategorized',
    });
    return product.save();
  }

  // 3. Get all products (optional filter by category)
  async getProducts(category?: string): Promise<Product[]> {
    if (category) {
      return this.productModel.find({ category }).exec();
    }
    return this.productModel.find().exec();
  }

  // 4. Update product category
  async updateCategory(barcode: string, newCategory: string): Promise<Product> {
    return this.productModel.findOneAndUpdate(
      { barcode },
      { category: newCategory },
      { new: true },
    );
  }
}
