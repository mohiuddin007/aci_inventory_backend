import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAnalytics() {
    const productCountsByCategory = await this.productModel.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const recentProducts = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    const totalProducts = await this.productModel.countDocuments();

    return {
      totalProducts,
      productCountsByCategory,
      recentProducts,
    };
  }
}
