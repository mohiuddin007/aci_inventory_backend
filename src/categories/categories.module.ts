import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoriesModule {}
