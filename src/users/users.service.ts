import { Prisma, User } from '@prisma/client'
import { HttpException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getUsers() {
        const users: User[] = await this.databaseService.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
        })
        const transformUserData = users.map(({password, ...userData}: User) => {
            return userData 
        })
        return {
            message: "Success get all user data",
            data: transformUserData
        }
    }

    async getUser(id: number) {
        const user: User = await this.databaseService.user.findFirst({
            where: {
                id
            },
        })
        if(!user) {
            throw new HttpException("User not found", 400)
        }
        const {password, ...data} = user
        return {
            message: "Success get user data",
            data
        }
    }

    async updateUser(id: number, body: Prisma.UserUpdateInput) {
        const user: User = await this.databaseService.user.findFirst({
            where: {
                id
            }
        })
        if(!user) {
            throw new HttpException("User not found", 400)
        }
        await this.databaseService.user.update({
            where: {
                id
            },
            data: {
                ...body
            }
        })
        return {
            message: "User has updated"
        }
    }

    async removeUser(id: number) {
        const user: User = await this.databaseService.user.findFirst({
            where: {
                id
            }
        })
        if(!user) {
            throw new HttpException("User not found", 400)
        }
        await this.databaseService.user.delete({
            where: {
                id
            }
        })
        return {
            message: "User has deleted"
        }
    }
}
