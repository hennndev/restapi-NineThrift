-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOrder" DROP CONSTRAINT "ProductOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOrder" DROP CONSTRAINT "ProductOrder_productId_fkey";
