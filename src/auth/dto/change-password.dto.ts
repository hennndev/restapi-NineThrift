import { IsString, IsEmail, MinLength } from 'class-validator'

export class ChangePasswordAuthDto {
    @IsString()
    @MinLength(7)
    currentPassword: string
    
    @IsString()
    @MinLength(7)
    currentPasswordConfirm: string
    
    @IsString()
    @MinLength(7)
    newPassword: string
}