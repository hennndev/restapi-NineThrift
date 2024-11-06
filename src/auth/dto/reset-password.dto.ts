import { IsString, IsEmail, MinLength } from 'class-validator'

export class ResetPasswordAuthDto {
    @IsString()
    @IsEmail()
    email: string
}
