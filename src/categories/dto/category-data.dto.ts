import { IsString } from "class-validator"

export class CategoryDataDto {
    @IsString()
    id: string

    @IsString()
    category: string
}