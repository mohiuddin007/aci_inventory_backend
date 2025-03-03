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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './schemas/product.schema';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 1. Scan barcode & save to DB
  @ApiOperation({ summary: 'Fetch product by barcode' })
  @UseGuards(JwtAuthGuard)
  @Get('scan/:barcode')
  async fetchProduct(@Param('barcode') barcode: string) {
    return this.productService.fetchProductByBarcode(barcode);
  }

  // 2. Add product manually
  @ApiOperation({ summary: 'Add a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Body() productData) {
    return this.productService.addProduct(productData);
  }

  // 3. Get all products
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
    type: [Product],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(@Query('category') category?: string) {
    return this.productService.getProducts(category);
  }

  // 4. Update product category
  @ApiOperation({ summary: 'Update a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product updated successfully',
    type: Product,
  })
  @UseGuards(JwtAuthGuard)
  @Put('update-category/:barcode')
  async updateCategory(
    @Param('barcode') barcode: string,
    @Body('category') newCategory: string,
  ) {
    return this.productService.updateCategory(barcode, newCategory);
  }
}
