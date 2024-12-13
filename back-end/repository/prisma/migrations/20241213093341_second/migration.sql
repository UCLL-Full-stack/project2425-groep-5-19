/*
  Warnings:

  - Added the required column `maxCost` to the `Army` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attack` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hitpoints` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Army" ADD COLUMN     "attack" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "defense" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hitpoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxCost" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "attack" INTEGER NOT NULL,
ADD COLUMN     "defense" INTEGER NOT NULL,
ADD COLUMN     "hitpoints" INTEGER NOT NULL;
