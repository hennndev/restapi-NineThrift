import { Prisma, Product } from '@prisma/client'
import { AddProductDto } from './dto/add-product.dto'
import { HttpException, Injectable } from '@nestjs/common'
import { UpdateProductDto } from './dto/update-product.dto'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ProductsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addProduct(body: AddProductDto) {
        const { name, image, price, description, categoryId, brandId,  } = body
        if(!name || !image || !price || !description || !categoryId || !brandId) {
            throw new HttpException("All field is required", 400)
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
                        id: brandId,
                    },
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
        const products: Product[] = await this.databaseService.product.findMany({
            include: {
                category: {
                    select: {
                        category: true
                    }
                },
                brand: {
                    select: {
                        brand: true
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            },
        })
        const transformedData = products.map(({categoryId, brandId, ...obj}: Product) => {
            return obj
        })
        return {
            message: "Success get all product data",
            data: transformedData
        }
    }

    async getProduct(id: number) {
        const product: Product = await this.databaseService.product.findFirst({
            where: {
                id
            },
            include: {
                category: {
                    select: {
                        category: true
                    }
                },
                brand: {
                    select: {
                        brand: true
                    }
                },
            }
        }) 
        const { categoryId, brandId, ...transformedData } = product
        if(!product) {
            throw new HttpException("Product not found", 400)
        }
        return {
            message: "Success get product data",
            data: transformedData
        }
    }

    async updateProduct(id: number, body: UpdateProductDto) {
        const product: Product = await this.databaseService.product.findFirst({
            where: {
                id
            }
        }) 
        if(!product) {
            throw new HttpException("Product not found", 400)
        }
        
        await this.databaseService.product.update({
            where: {
                id
            },
            data: {
                ...body
            }
        })
        return {
            message: "Product has updated"
        }
    }

    async removeProduct(id: number) {
        const product: Product = await this.databaseService.product.findFirst({
            where: {
                id
            }
        }) 
        if(!product) {
            throw new HttpException("Product not found", 400)
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
