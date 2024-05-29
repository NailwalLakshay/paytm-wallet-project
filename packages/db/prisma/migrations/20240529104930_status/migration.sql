/*
  Warnings:

  - Added the required column `status` to the `P2P_TRANSFER` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "P2P_TransferStatus" AS ENUM ('SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "P2P_TRANSFER" ADD COLUMN     "status" "P2P_TransferStatus" NOT NULL;
