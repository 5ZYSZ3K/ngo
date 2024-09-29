/*
  Warnings:

  - You are about to drop the column `text` on the `FoundationRequest` table. All the data in the column will be lost.
  - Added the required column `description` to the `FoundationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `FoundationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoundationRequest" DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL;
