import * as bcrypt from 'bcryptjs'
import { User } from '@prisma/client'
import { LoginAuthDto } from './dto/login.dto'
import { RegisterAuthDto } from './dto/register.dto'
import { HttpException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {}

    async login(body: LoginAuthDto) {
        const {email, password} = body
        if(!email || !password) {
            throw new HttpException("All field is required", 400)
        }
        const user: User = await this.databaseService.user.findUnique({
            where: {
                email
            }
        })
        if(!user) {
            throw new HttpException("User not found", 400)
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            throw new HttpException("Password incorrect", 400)
        }
        return {
            message: "Success login",
        }
    }

    async register(body: RegisterAuthDto) {
        const { username, email, password } = body
        if(!username || !email || !password) {
            throw new HttpException("All field is required", 400)
        }
        const user: User = await this.databaseService.user.findUnique({
            where: {
                email
            }
        })
        if(user) {
            throw new HttpException("User already registered", 400)
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await this.databaseService.user.create({
            data: {
                username,
                email,
                password: hashPassword,
                profile: {
                    city: "",
                    country: "",
                    address1: "",
                    address2: "",
                    postalCode: "",
                    phoneNumber: "",
                }
            }
        })
        return {
            message: "Success register and create new user"
        }
    }
}
