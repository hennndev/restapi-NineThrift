/*
  Warnings:

  - A unique constraint covering the columns `[brand]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brand_brand_key" ON "Brand"("brand");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");
