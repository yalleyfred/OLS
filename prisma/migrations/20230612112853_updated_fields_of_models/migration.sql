/*
  Warnings:

  - You are about to drop the column `Biography` on the `authors` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `Address` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `description` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authors" DROP COLUMN "Biography",
ADD COLUMN     "biography" TEXT;

-- AlterTable
ALTER TABLE "books" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "Address",
DROP COLUMN "Phone",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
