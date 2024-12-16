-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_armyId_fkey";

-- AlterTable
ALTER TABLE "Unit" ALTER COLUMN "armyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_armyId_fkey" FOREIGN KEY ("armyId") REFERENCES "Army"("id") ON DELETE SET NULL ON UPDATE CASCADE;
