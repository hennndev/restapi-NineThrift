import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CategoriesModule, BrandsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
