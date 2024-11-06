import { IsString, IsEmail, MinLength } from 'class-validator'

export class RegisterAuthDto {
    @IsString()
    username: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(7)
    password: string
}