/*
  Warnings:

  - Added the required column `login` to the `Foundation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwdHash` to the `Foundation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foundation" ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "passwdHash" TEXT NOT NULL;
