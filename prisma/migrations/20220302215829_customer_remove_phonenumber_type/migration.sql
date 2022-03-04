/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Customer_phoneNumber_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "phoneNumber";
