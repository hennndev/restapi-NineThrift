import { Prisma, Brand } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'
import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class BrandsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addBrand(body: Prisma.BrandCreateInput) {
        const { brand } = body
        if(!brand) {
            throw new HttpException("Brand fiels is required", 400)
        }
        const brandData: Brand = await this.databaseService.brand.findUnique({
            where: {
                brand
            }
        })
        if(brandData) {
            throw new HttpException("Brand already added", 400)
        }
        await this.databaseService.brand.create({
            data: {
                brand
            }
        })
        return {
            message: "New brand has added"
        }
    }

    async getBrands() {
        const data: Brand[] = await this.databaseService.brand.findMany({})
        return {
            message: "Success get all brand data",
            data
        }
    }

    async getBrand(id: number) {
        const brand: Brand = await this.databaseService.brand.findFirst({
            where: {
                id
            }
        }) 
        if(!brand) {
            throw new HttpException("Brand not found", 400)
        }
        return {
            message: "Success get brand data",
            data: brand
        }
    }

    async updateBrand(id: number, body: Prisma.BrandUpdateInput) {
        const { brand } = body
        if(!brand) {
            throw new HttpException("Brand field is required", 400)
        }
        const brandData = await this.databaseService.brand.findFirst({
            where: {
                id
            }
        })
        if(!brandData) {
            throw new HttpException("Brand not found", 400)
        }
        await this.databaseService.brand.update({
            where: {
                id
            },
            data: {
                brand
            }
        })
    }

    async removeBrand(id: number) {
        const brand = await this.databaseService.brand.findFirst({
            where: {
                id
            }
        })
        if(!brand) {
            throw new HttpException("Brand not found", 400)
        }
        await this.databaseService.brand.delete({
            where: {
                id
            }
        })
        return {
            message: "Brand has deleted"
        }
    }
}
