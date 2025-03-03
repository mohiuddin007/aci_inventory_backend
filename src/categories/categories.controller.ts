import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @ApiOperation({ summary: 'Fetch all categories' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
