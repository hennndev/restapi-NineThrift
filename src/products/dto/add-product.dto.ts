import { IsInt, IsString,  } from 'class-validator'

export class AddProductDto {
    @IsString()
    name: string

    @IsString()
    image: string

    @IsInt()
    price: number

    @IsString()
    categoryId: string

    @IsString()
    brandId: string

    @IsString()
    description: string
}
