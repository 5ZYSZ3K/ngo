/*
  Warnings:

  - Added the required column `url` to the `FoundationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoundationRequest" ADD COLUMN     "url" TEXT NOT NULL;
