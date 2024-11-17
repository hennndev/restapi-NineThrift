import { v4 as uuid} from 'uuid'
import { Order, Prisma, OrderStatus } from '@prisma/client'
import { CreateOrderDto } from './dto/create-order.dto'
import { HttpException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class OrdersService {
    constructor(private readonly databaseService: DatabaseService) {}
    
    async createOrder(body: CreateOrderDto) {
        const { totalOrders, totalPrice, userId, products } = body
        if(!totalOrders || !userId || !totalPrice || !products || products.length < 1) {
            throw new HttpException("All field is required", 400)
        }
        if(products.length < 1) {
            throw new HttpException("Minimum products 1 item", 400)
        }
        const order = await this.databaseService.order.create({
            data: {
                id: uuid(),
                totalOrders,
                totalPrice,
                user: {
                    connect: {
                        id: userId
                    }
                },
            },
            select: {
                id: true
            }
        })
        const productsOrder = products.map((obj) => ({
            orderId: order.id,
            productId: obj.productId,
            quantity: obj.quantity
        }))

        await this.databaseService.productOrder.createMany({
            data: productsOrder
        })

        return {
            message: "Success create new order"
        }
    }
    
    async getOrders() {
        const orders = await this.databaseService.order.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        email: true, 
                        profile: true,
                        password: false
                    }
                },
                products: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                image: true,
                                price: true,
                                brand: {
                                    select: {
                                        brand: true
                                    }
                                },
                                category: {
                                    select: {
                                        category: true
                                    }
                                },
                                description: true,
                                discount: true
                            }
                        },
                    },
                   
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return {
            message: "Success get all order data",
            data: orders
        }
    }

    async getOrder(id: string) {
        const order = await this.databaseService.order.findFirst({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        username: true,
                        email: true, 
                        profile: true,
                        password: false
                    }
                },
                products: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                image: true,
                                price: true,
                                brand: {
                                    select: {
                                        brand: true
                                    }
                                },
                                category: {
                                    select: {
                                        category: true
                                    }
                                },
                                description: true,
                                discount: true
                            }
                        },
                    },
                   
                },
            },
        })
        if(!order) {
            throw new HttpException("Order not found", 400)
        }
        return {
            message: "Success get order data",
            data: order
        }
    }

    async updateOrder(id: string, body: Prisma.OrderUpdateInput) {
        const { status } = body
        if(!status) {
            throw new HttpException("Status field is required", 400)
        }
        const order = await this.databaseService.order.findFirst({
            where: {
                id
            },
        })
        if(!order) {
            throw new HttpException("Order not found", 400)
        }
        if(status === OrderStatus.PROCESSING || status === OrderStatus.COMPLETED || status === OrderStatus.CANCELLED) {
            await this.databaseService.order.update({
                where: { id },
                data: {
                    status: body.status
                }
            })
            return {
                message: "Order status has updated"
            }
        
        } else {
            throw new HttpException("Status only can change PROCESSING/COMPLETED/CANCELLED", 400)
        }
    }

    async removeOrder(id: string) {
        const order = await this.databaseService.order.findFirst({
            where: {
                id
            }
        })
        if(!order) {
            throw new HttpException("Order not found", 400)
        }
        await this.databaseService.order.delete({
            where: {
                id
            }
        })
        return {
            message: "Order has deleted"
        }
    }
}
