import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    const category = new this.categoryModel({ name });
    return category.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
