import { Prisma } from '@prisma/client'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'

@Controller('api/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    createOrder(@Body() body: CreateOrderDto) {
        return this.ordersService.createOrder(body)
    }

    @Get()
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Get(':id')
    getOrder(@Param('id') id: string) {
        return this.ordersService.getOrder(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Prisma.OrderUpdateInput) {
        return this.ordersService.updateOrder(id, body);
    }

    @Delete(':id')
    removeOrder(@Param('id') id: string) {
        return this.ordersService.removeOrder(id);
    }
}
