import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UserRole } from 'src/users/entity/user.entity';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('categories')
@ApiBearerAuth() // Requires JWT authentication
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new category (Admin Only)' })
    @ApiResponse({ status: 201, description: 'Category created successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden. Only Admins can create categories.' })
    @ApiBody({ type: CreateCategoryDto })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Retrieve all categories (Admin & User)' })
    @ApiResponse({ status: 200, description: 'List of all categories.' })
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Retrieve a category by ID (Admin & User)' })
    @ApiParam({ name: 'id', description: 'Category ID', type: String })
    @ApiResponse({ status: 200, description: 'Category details retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update a category (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Category ID', type: String })
    @ApiResponse({ status: 200, description: 'Category updated successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden. Only Admins can update categories.' })
    @ApiBody({ type: UpdateCategoryDto })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete a category (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Category ID', type: String })
    @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden. Only Admins can delete categories.' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
