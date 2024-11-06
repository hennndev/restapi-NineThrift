import { IsBoolean, IsDate, IsInt, IsNumber, IsObject, IsString, ValidateNested,  } from 'class-validator'
import { Type } from 'class-transformer'

class ProductDiscount {
    @IsBoolean()
    isDiscount: boolean

    @IsNumber()
    discount: number
}

export class ProductDatatDto {
    @IsString()
    id: string
    
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

    @IsObject()
    @ValidateNested()
    @Type(() => ProductDiscount)
    discount:  ProductDiscount
    
    @IsDate()
    createdAt: Date
}

