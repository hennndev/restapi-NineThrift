import { Injectable } from '@nestjs/common'
import { AddProductDto } from './dto/add-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
    addProduct(body: AddProductDto) {
        return 'This action adds a new product'
    }

    getProducts() {
        return `This action returns all products`
    }

    getProduct(id: number) {
        return `This action returns a #${id} product`
    }

    updateProduct(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`
    }

    removeProduct(id: number) {
        return `This action removes a #${id} product`
    }
}
