/*
  Warnings:

  - You are about to drop the column `text` on the `Foundation` table. All the data in the column will be lost.
  - Added the required column `description` to the `Foundation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Foundation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warranties` to the `Foundation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foundation" DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isCertified" BOOLEAN,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "warranties" INTEGER NOT NULL;
