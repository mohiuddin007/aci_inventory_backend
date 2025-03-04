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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        barcode: { type: 'string', example: '1234567890123' },
        name: { type: 'string', example: 'Laptop' },
        category: { type: 'string', example: 'Electronics' },
        description: { type: 'string', example: 'description' },
        material: { type: 'number', example: 12345 },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Body() productData) {
    console.log(productData);
    return this.productService.addProduct(productData);
  }

  // 3. Get all products
  @ApiOperation({ summary: 'Retrieve all products' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(@Query('category') category?: string) {
    return this.productService.getProducts(category);
  }

  // 4. Update product category
  @ApiOperation({ summary: 'Update a new product' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        category: { type: 'string', example: 'Updated Category' },
      },
    },
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
