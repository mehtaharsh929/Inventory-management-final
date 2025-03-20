import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({ description: 'Unique identifier of the product to update', example: '123e4567-e89b-12d3-a456-426614174000' })
    productId?: string;

    @ApiProperty({ description: 'Name of the product', example: 'Wireless Mouse', required: false })
    name?: string;

    @ApiProperty({ description: 'Description of the product', example: 'A high-quality wireless mouse', required: false })
    description?: string;

    @ApiProperty({ description: 'Quantity of the product in stock', example: 50, required: false, minimum: 0 })
    quantity?: number;

    @ApiProperty({ description: 'Price of the product', example: 29.99, required: false })
    price?: number;

    @ApiProperty({ description: 'Optional supplier information', example: 'Supplier Inc.', required: false })
    supplierInfo?: string;

    @ApiProperty({ description: 'Unique identifier of the associated category', example: '123e4567-e89b-12d3-a456-426614174111', required: false })
    categoryId?: string;

    @ApiProperty({ description: 'Low stock threshold for alerting purposes', example: 10, required: false, minimum: 0 })
    lowStockThreshold?: number;
}
