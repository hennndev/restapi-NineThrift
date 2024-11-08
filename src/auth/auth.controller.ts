import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login.dto'
import { RegisterAuthDto } from './dto/register.dto'
import { ResetPasswordAuthDto } from './dto/reset-password.dto'
import { ChangePasswordAuthDto } from './dto/change-password.dto'

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    @HttpCode(200)
    create(@Body() body: LoginAuthDto) {
        return this.authService.login(body)
    }

    @Post("/register")
    @HttpCode(201)
    register(@Body() body: RegisterAuthDto) {
        return this.authService.register(body)
    }

    // @Post("/reset-password")
    // @HttpCode(200)
    // resetPassword(@Body() body: ResetPasswordAuthDto) {
    //     return this.authService.resetPassword(body)
    // }   

    // @Post("/change-password")
    // @HttpCode(200)
    // changePassword(@Body() body: ChangePasswordAuthDto) {
    //     return this.authService.changePassword(body)
    // }
}
