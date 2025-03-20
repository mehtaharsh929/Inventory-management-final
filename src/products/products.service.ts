import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/entity/category.entity';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { EmailService } from 'src/email/email.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        private emailService: EmailService,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const category = await this.categoryRepository.findOne({ where: { id: createProductDto.categoryId } });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const newProduct = this.productRepository.create({ ...createProductDto, category });
        return this.productRepository.save(newProduct);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);

        if (updateProductDto.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId } });
            if (!category) {
                throw new NotFoundException('Category not found');
            }
            product.category = category;
        }

        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }

    async remove(id: string): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }

    async updateStock(updateProductStockDto: UpdateProductStockDto): Promise<Product> {
        const { productId, quantity } = updateProductStockDto;
        const product = await this.productRepository.findOne({ where: { id: productId } });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (quantity < 0) {
            throw new BadRequestException('Stock quantity cannot be negative');
        }

        product.quantity = quantity;
        return this.productRepository.save(product);
    }

    async searchProducts(searchProductDto: SearchProductDto): Promise<Product[]> {
        const { category, name, minPrice, maxPrice } = searchProductDto;

        const query = this.productRepository.createQueryBuilder('product');

        if (category) {
            query.andWhere('product.category = :category', { category });
        }

        if (name) {
            query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
        }

        if (minPrice !== undefined) {
            query.andWhere('product.price >= :minPrice', { minPrice });
        }

        if (maxPrice !== undefined) {
            query.andWhere('product.price <= :maxPrice', { maxPrice });
        }

        return query.getMany();
    }

    async getLowStockAlerts(): Promise<Product[]> {
        return this.productRepository
            .createQueryBuilder('product')
            .where('product.quantity < product.lowStockThreshold')
            .getMany();
    }

    async getTotalStockValue(): Promise<number> {
        const products = await this.productRepository.find();
        return products.reduce((total, product) => total + product.quantity * Number(product.price), 0);
    }

    async getOutOfStockItems(): Promise<Product[]> {
        return this.productRepository.find({ where: { quantity: 0 } });
    }

    async getCategoryWiseStockDistribution(): Promise<any[]> {
        return this.productRepository
            .createQueryBuilder('product')
            .select('product.categoryId', 'category')
            .addSelect('SUM(product.quantity)', 'totalStock')
            .groupBy('product.categoryId')
            .getRawMany();
    }

    // CRON job to check low stock every day at 9 AM
    @Cron('0 9 * * *') // Daily at 9 AM
    async checkLowStock() {
        // Directly fetch products with low stock
        const lowStockProducts = await this.productRepository
            .createQueryBuilder('product')
            .where('product.quantity <= product.lowStockThreshold')
            .getMany();

        for (const product of lowStockProducts) {
            await this.emailService.sendLowStockAlert(
                product.name,
                product.quantity,
                product.lowStockThreshold,
            );
            console.log(
                `Low stock alert sent for ${product.name} (Quantity: ${product.quantity})`,
            );
        }
    }
}
