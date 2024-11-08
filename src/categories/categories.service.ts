import { Prisma, Category } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'
import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class CategoriesService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addCategory(body: Prisma.CategoryCreateInput) {
        const { category } = body
        if(!category) {
            throw new HttpException("Category field is required", 400)
        }
        const checkExistCategory: Category = await this.databaseService.category.findUnique({
            where: {
                category
            }
        })
        if(checkExistCategory) {
            throw new HttpException("Category already added", 400)
        }
        await this.databaseService.category.create({
            data: {
                category
            }
        })
        return {
            message: "New category has created"
        }
    }

    async getCategories() {
        const categories: Category[] = await this.databaseService.category.findMany({})
        return {
            message: "Success get all category data",
            data: categories
        }
    }

    async getCategory(id: number) {
        const category: Category = await this.databaseService.category.findFirst({
            where: {
                id
            }
        })
        if(!category) {
            throw new HttpException("Category not found", 400)
        }
        return {
            message: "Success get category",
            data: category
        }
    }

    async updateCategory(id: number, body: Prisma.CategoryUpdateInput) {
        const { category } = body
        if(!category) {
            throw new HttpException("Category field is required", 400)
        }
        const categoryData: Category = await this.databaseService.category.findFirst({
            where: {
                id
            }
        })
        if(!categoryData) {
            throw new HttpException("Category not found", 400)
        }
        
        await this.databaseService.category.update({
            where: {
                id
            },
            data: {
                category
            }
        })
        return {
            message: "Category has updated"
        }
    }

    async removeCategory(id: number) {
        const category: Category = await this.databaseService.category.findFirst({
            where: {
                id
            }
        })
        if(!category) {
            throw new HttpException("Category not found", 400)
        }
        await this.databaseService.category.delete({
            where: {
                id
            }
        })
        return {
            message: "Category has deleted"
        }
    }
}
