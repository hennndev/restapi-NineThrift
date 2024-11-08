-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "profile" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "discount" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "totalOrders" INTEGER NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "orderId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_categoryId_key" ON "Product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_brandId_key" ON "Product"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOrder_orderId_key" ON "ProductOrder"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOrder_productId_key" ON "ProductOrder"("productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
