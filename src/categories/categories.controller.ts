import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    addCategory(@Body() body: AddCategoryDto) {
        return this.categoriesService.addCategory(body)
    }

    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @Get(':id')
    getCategory(@Param('id') id: string) {
        return this.categoriesService.getCategory(+id)
    }

    @Patch(':id')
    updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.updateCategory(+id, updateCategoryDto)
    }

    @Delete(':id')
    removeCategory(@Param('id') id: string) {
        return this.categoriesService.removeCategory(+id)
    }
}
