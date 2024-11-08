import { Prisma, User } from '@prisma/client'
import { BadRequestException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getUsers() {
        const data: User[] = await this.databaseService.user.findMany({})
        const transformUserData = data.map(({password, ...userData}: User) => {
            return userData
        })
        return {
            message: "Success get all user",
            data: transformUserData
        }
    }

    async getUser(id: number) {
        const user: User = await this.databaseService.user.findFirst({
            where: {
                id
            }
        })
        if(!user) {
            throw new BadRequestException("User not found")
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
            throw new BadRequestException("User not found")
        }
        await this.databaseService.user.update({
            where: {
                id
            },
            data: {
                ...body
            }
        })
    }

    async removeUser(id: number) {
        const user: User = await this.databaseService.user.findFirst({
            where: {
                id
            }
        })
        if(!user) {
            throw new BadRequestException("User not found")
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
