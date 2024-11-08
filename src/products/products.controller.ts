import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';


@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(@Body() body: AddProductDto) {
        return this.productsService.addProduct(body)
    }

    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.productsService.getProduct(+id)
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() body: Prisma.ProductUpdateInput) {
        return this.productsService.updateProduct(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productsService.removeProduct(+id)
    }
}
