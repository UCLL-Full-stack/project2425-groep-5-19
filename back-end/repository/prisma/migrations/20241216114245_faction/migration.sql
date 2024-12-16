/*
  Warnings:

  - Added the required column `faction` to the `Army` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faction` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Army" ADD COLUMN     "faction" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "faction" TEXT NOT NULL;
