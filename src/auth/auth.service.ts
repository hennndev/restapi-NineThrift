import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'
import { LoginAuthDto } from './dto/login.dto'
import { RegisterAuthDto } from './dto/register.dto'
import { ResetPasswordAuthDto } from './dto/reset-password.dto'
import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { ChangePasswordAuthDto } from './dto/change-password.dto'
import { DatabaseService } from 'src/database/database.service'

type LoginValueTypes = {
    message: string
} 

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {}

    async login(body: LoginAuthDto): Promise<LoginValueTypes> {
        const {email, password} = body
        if(!email || !password) {
            throw new HttpException("All field is required", 400)
        }
        const user = await this.databaseService.user.findUnique({
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
        console.log(user)
        return {
            message: "Success login",
        }
    }

    async register(body: RegisterAuthDto) {
        const { username, email, password } = body
        if(!username || !email || !password) {
            throw new HttpException("All field is required", 400)
        }
        const user = await this.databaseService.user.findUnique({
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
                    phoneNumber: "",
                    country: "",
                    address1: "",
                    address2: "",
                    postalCode: ""
                }
            }
        })
        return {
            message: "Success register and create new user"
        }
    }


    // resetPassword(body: ResetPasswordAuthDto) {
    //     const { email } = body
    //     if(!email) {
    //         throw new HttpException("Email field is required")
    //     }
    //     const userDB = readUserDB()
    //     const user: Prisma.UserCreateInput = userDB.find((obj: Prisma.UserCreateInput) => obj.email === email)
    //     if(!user) {
    //         throw new HttpException("User not found")
    //     }
    //     const transformUserDB = userDB.map((obj: Prisma.UserCreateInput) => {
    //         if(obj.email === email) {
    //             return {
    //                 ...obj, 
    //                 password: ""
    //             }
    //         } else {
    //             return obj
    //         }
    //     })
    //     writeUserDB(JSON.stringify(transformUserDB))
    //     return {
    //         message: "Your password has been reseted. You will redirect to reset password page."
    //     }
    // }

    // async changePassword(body: ChangePasswordAuthDto) {
    //     const { currentPassword, currentPasswordConfirm, newPassword } = body
    //     if(!currentPassword || !currentPasswordConfirm || !newPassword) {
    //         throw new HttpException("All field is required")
    //     }
    //     const userDB = readUserDB()
    //     return {
    //         message: "Your password has changed"
    //     }
    // }
}
