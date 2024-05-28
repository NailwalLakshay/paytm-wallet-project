/*
  Warnings:

  - Added the required column `decimal` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locked` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decimal` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "decimal" INTEGER NOT NULL,
ADD COLUMN     "locked" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "decimal" INTEGER NOT NULL;
