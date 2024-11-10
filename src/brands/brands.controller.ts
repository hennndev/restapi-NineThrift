import { Prisma } from '@prisma/client'
import { BrandsService } from './brands.service'
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'

@Controller('api/brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Post()
    addBrand(@Body() body: Prisma.BrandCreateInput) {
        return this.brandsService.addBrand(body)
    }

    @Get()
    getBrands() {
        return this.brandsService.getBrands()
    }

    @Get(':id')
    getBrand(@Param('id') id: number) {
        return this.brandsService.getBrand(+id)
    }

    @Put(':id')
    updateBrand(@Param('id') id: number, @Body() body: Prisma.BrandUpdateInput) {
        return this.brandsService.updateBrand(+id, body)
    }

    @Delete(':id')
    removeBrand(@Param('id') id: number) {
        return this.brandsService.removeBrand(+id)
    }
}
