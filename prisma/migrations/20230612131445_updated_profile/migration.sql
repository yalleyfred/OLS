/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `publishers` table. All the data in the column will be lost.
  - Added the required column `phone` to the `publishers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "availabilityStatus" SET DEFAULT true;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "accountStatus" SET DEFAULT true;

-- AlterTable
ALTER TABLE "publishers" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "websiteUrl" DROP NOT NULL;
