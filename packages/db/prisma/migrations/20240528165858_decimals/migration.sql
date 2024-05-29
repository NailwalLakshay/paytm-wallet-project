/*
  Warnings:

  - You are about to drop the column `decimal` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `decimal` on the `OnRampTransaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OnRampTransaction_userId_key";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "decimal";

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "decimal";
