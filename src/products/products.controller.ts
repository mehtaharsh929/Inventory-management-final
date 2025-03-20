import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/entity/user.entity';
import { Roles } from 'src/auth/guards/roles.decorator';


@ApiTags('Products')
@ApiBearerAuth() // For JWT auth
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully.' })
    @Roles(UserRole.ADMIN)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Retrieved all products.' })
    @Roles(UserRole.ADMIN, UserRole.USER)
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product found.' })
    @Roles(UserRole.ADMIN, UserRole.USER)
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product updated successfully.' })
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    @Put('update-stock')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update product stock levels' })
    @ApiResponse({ status: 200, description: 'Stock updated successfully.' })
    @Roles(UserRole.ADMIN)
    async updateStock(@Body() updateProductStockDto: UpdateProductStockDto) {
        return this.productsService.updateStock(updateProductStockDto);
    }

    @Get('search')
    @ApiOperation({ summary: 'Search products by category, name, or price range' })
    @ApiQuery({ name: 'category', required: false })
    @ApiQuery({ name: 'name', required: false })
    @ApiQuery({ name: 'minPrice', required: false })
    @ApiQuery({ name: 'maxPrice', required: false })
    @ApiResponse({ status: 200, description: 'Search results returned.' })
    @Roles(UserRole.ADMIN, UserRole.USER)
    async searchProducts(@Query() searchProductDto: SearchProductDto) {
        return this.productsService.searchProducts(searchProductDto);
    }

    @Get('low-stock-alerts')
    @ApiOperation({ summary: 'Get low stock alerts for products' })
    @ApiResponse({ status: 200, description: 'Low stock alerts retrieved.' })
    @Roles(UserRole.ADMIN)
    async getLowStockAlerts() {
        return this.productsService.getLowStockAlerts();
    }

    @Get('analytics/total-stock-value')
    @ApiOperation({ summary: 'Get total stock value of products' })
    @ApiResponse({ status: 200, description: 'Total stock value retrieved.' })
    @Roles(UserRole.ADMIN)
    async getTotalStockValue() {
        return this.productsService.getTotalStockValue();
    }

    @Get('analytics/out-of-stock')
    @ApiOperation({ summary: 'Get all out-of-stock products' })
    @ApiResponse({ status: 200, description: 'Out-of-stock products retrieved.' })
    @Roles(UserRole.ADMIN)
    async getOutOfStockItems() {
        return this.productsService.getOutOfStockItems();
    }

    @Get('analytics/category-stock')
    @ApiOperation({ summary: 'Get category-wise stock distribution' })
    @ApiResponse({ status: 200, description: 'Category-wise stock distribution retrieved.' })
    @Roles(UserRole.ADMIN)
    async getCategoryWiseStockDistribution() {
        return this.productsService.getCategoryWiseStockDistribution();
    }
}
