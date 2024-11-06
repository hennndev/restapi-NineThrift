import { IsString, IsEmail, MinLength } from 'class-validator'

export class LoginAuthDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(7)
    password: string
}