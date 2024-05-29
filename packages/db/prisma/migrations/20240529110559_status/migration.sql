/*
  Warnings:

  - The `status` column on the `P2P_TRANSFER` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "P2P_TRANSFER" DROP COLUMN "status",
ADD COLUMN     "status" "OnRampStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "P2P_TransferStatus";
