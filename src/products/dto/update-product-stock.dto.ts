import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductStockDto {
  @ApiProperty({ description: 'Unique identifier of the product', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Quantity to update the stock with', example: 10, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Stock quantity cannot be negative' })
  quantity: number;
}
