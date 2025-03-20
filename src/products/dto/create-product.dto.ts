import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDecimal, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Unique ID of the product' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Quantity of the product' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Price of the product', type: 'number', format: 'decimal' })
  @IsDecimal()
  price: number;

  @ApiPropertyOptional({ description: 'Supplier information' })
  @IsString()
  @IsOptional()
  supplierInfo?: string;

  @ApiProperty({ description: 'Category ID of the product', format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({ description: 'Low stock threshold for the product', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  lowStockThreshold?: number;
}
