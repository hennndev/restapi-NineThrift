import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, ValidateNested } from "class-validator"


class ProductOrder {
    @IsInt()
    productId: number

    @IsInt()
    quantity: number
}
export class CreateOrderDto {
    @IsInt()
    totalOrders: number

    @IsInt()
    totalPrice: number

    @IsInt()
    userId: number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrder)
    products: ProductOrder[]
}

