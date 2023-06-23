/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `authors` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `genres` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `publishers` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `reading_histories` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authors" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "books" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "genres" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "publishers" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "reading_histories" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
