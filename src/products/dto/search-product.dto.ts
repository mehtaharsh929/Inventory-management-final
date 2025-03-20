import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class SearchProductDto {
  @ApiPropertyOptional({ description: 'Category to filter products by' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Name to filter products by' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Minimum price to filter products', minimum: 0, example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price to filter products', minimum: 0, example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
