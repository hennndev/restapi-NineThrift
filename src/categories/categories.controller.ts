import { Prisma } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'

@Controller('api/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    addCategory(@Body() body: Prisma.CategoryCreateInput) {
        return this.categoriesService.addCategory(body)
    }

    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @Get(':id')
    getCategory(@Param('id') id: number) {
        return this.categoriesService.getCategory(+id)
    }

    @Put(':id')
    updateCategory(@Param('id') id: number, @Body() body: Prisma.CategoryUpdateInput) {
        return this.categoriesService.updateCategory(+id, body)
    }

    @Delete(':id')
    removeCategory(@Param('id') id: number) {
        return this.categoriesService.removeCategory(+id)
    }
}
