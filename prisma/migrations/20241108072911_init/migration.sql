-- DropIndex
DROP INDEX "Order_userId_key";

-- DropIndex
DROP INDEX "Product_brandId_key";

-- DropIndex
DROP INDEX "Product_categoryId_key";

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
