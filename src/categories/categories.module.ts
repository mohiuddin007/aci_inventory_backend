import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoriesModule {}
