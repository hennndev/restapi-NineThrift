import { BadRequestException, Injectable } from '@nestjs/common'
import { AddProductDto } from './dto/add-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Prisma, Product } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ProductsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addProduct(body: AddProductDto) {
        const { name, image, price, description, categoryId, brandId,  } = body
        if(!name || !image || !price || !description || !categoryId || !brandId) {
            throw new BadRequestException("All field is required")
        }
        await this.databaseService.product.create({
            data: {
                name, price, image, description, 
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                brand: {
                    connect: {
                        id: brandId
                    }
                },
                discount: {
                    isDiscount: false,
                    discount: 0
                }
            }
        })
        return {
            message: "New product has added"
        }
    }

    async getProducts() {
        const data: Product[] = await this.databaseService.product.findMany({
            include: {
                category: true,
                brand: true
            },
        })
        return {
            message: "Success get all product",
            data
        }
    }

    async getProduct(id: number) {
        const product: Product = await this.databaseService.product.findFirst({
            where: {
                id
            },
            include: {
                category: true,
                brand: true
            }
        }) 
        const { categoryId, brandId, ...transformedData } = product
        if(!product) {
            throw new BadRequestException("Product not found")
        }
        return {
            message: "Success get product data",
            data: transformedData
        }
    }

    async updateProduct(id: number, body: Prisma.ProductUpdateInput) {
        const product: Product = await this.databaseService.product.findFirst({
            where: {
                id
            }
        }) 
        if(!product) {
            throw new BadRequestException("Product not found")
        }
    }

    async removeProduct(id: number) {
        const product: Product = await this.databaseService.product.findFirst({
            where: {
                id
            }
        }) 
        if(!product) {
            throw new BadRequestException("Product not found")
        }
        await this.databaseService.product.delete({
            where: {
                id
            }
        })
        return {
            message: "Product has deleted"
        }
    }
}
