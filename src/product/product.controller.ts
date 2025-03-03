import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 1. Scan barcode & save to DB
  @UseGuards(JwtAuthGuard)
  @Get('scan/:barcode')
  async fetchProduct(@Param('barcode') barcode: string) {
    return this.productService.fetchProductByBarcode(barcode);
  }

  // 2. Add product manually
  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Body() productData) {
    return this.productService.addProduct(productData);
  }

  // 3. Get all products
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(@Query('category') category?: string) {
    return this.productService.getProducts(category);
  }

  // 4. Update product category
  @UseGuards(JwtAuthGuard)
  @Put('update-category/:barcode')
  async updateCategory(
    @Param('barcode') barcode: string,
    @Body('category') newCategory: string,
  ) {
    return this.productService.updateCategory(barcode, newCategory);
  }
}
