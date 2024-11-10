import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login.dto'
import { RegisterAuthDto } from './dto/register.dto'
import { Controller, Post, Body, HttpCode } from '@nestjs/common'

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
}
