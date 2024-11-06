import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcryptjs'
import { LoginAuthDto } from './dto/login.dto'
import { UserDataDto } from './dto/user-data.dto'
import { RegisterAuthDto } from './dto/register.dto'
import { readUserDB, writeUserDB } from 'src/utils/utils'
import { ResetPasswordAuthDto } from './dto/reset-password.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ChangePasswordAuthDto } from './dto/change-password.dto'

type LoginValueTypes = {
    message: string
} 

@Injectable()
export class AuthService {
    async login(body: LoginAuthDto): Promise<LoginValueTypes> {
        const {email, password} = body
        if(!email || !password) {
            throw new BadRequestException("All field is required")
        }
        const userDB = readUserDB()
        const user: UserDataDto = userDB.find((obj: UserDataDto) => obj.email === email)
        if(!user) {
            throw new BadRequestException("User not found")
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            throw new BadRequestException("Password incorrect")
        }
        return {
            message: "Success login",
        }
    }

    async register(body: RegisterAuthDto) {
        const { username, email, password } = body
        if(!username || !email || !password) {
            throw new BadRequestException("All field is required")
        }
        const userDB = readUserDB()
        const user: UserDataDto = userDB.find((obj: UserDataDto) => obj.email === email)
        if(user) {
            throw new BadRequestException("User already registered")
        }
        const hashPassword = await bcrypt.hash(password, 10)
        userDB.push({
            id: uuid(),
            createdAt: new Date(),
            username: username,
            email: email,
            password: hashPassword
        })
        writeUserDB(JSON.stringify(userDB))
        return {
            message: "Success register and create new user"
        }
    }


    resetPassword(body: ResetPasswordAuthDto) {
        const { email } = body
        if(!email) {
            throw new BadRequestException("Email field is required")
        }
        const userDB = readUserDB()
        const user: UserDataDto = userDB.find((obj: UserDataDto) => obj.email === email)
        if(!user) {
            throw new BadRequestException("User not found")
        }
        const transformUserDB = userDB.map((obj: UserDataDto) => {
            if(obj.email === email) {
                return {
                    ...obj, 
                    password: ""
                }
            } else {
                return obj
            }
        })
        writeUserDB(JSON.stringify(transformUserDB))
        return {
            message: "Your password has been reseted. You will redirect to reset password page."
        }
    }

    async changePassword(body: ChangePasswordAuthDto) {
        const { currentPassword, currentPasswordConfirm, newPassword } = body
        if(!currentPassword || !currentPasswordConfirm || !newPassword) {
            throw new BadRequestException("All field is required")
        }
        const userDB = readUserDB()
        return {
            message: "Your password has changed"
        }
    }
}
