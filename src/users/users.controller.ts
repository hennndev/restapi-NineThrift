import { Prisma } from '@prisma/client'
import { UsersService } from './users.service'
import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.usersService.getUser(+id)
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() body: Prisma.UserUpdateInput) {
        return this.usersService.updateUser(+id, body)
    }

    @Delete(':id')
    removeUser(@Param('id') id: number) {
        return this.usersService.removeUser(+id)
    }
}
