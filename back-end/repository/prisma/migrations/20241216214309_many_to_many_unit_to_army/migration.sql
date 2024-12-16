-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_armyId_fkey";

-- CreateTable
CREATE TABLE "_ArmyToUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArmyToUnit_AB_unique" ON "_ArmyToUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_ArmyToUnit_B_index" ON "_ArmyToUnit"("B");

-- AddForeignKey
ALTER TABLE "_ArmyToUnit" ADD CONSTRAINT "_ArmyToUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "Army"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmyToUnit" ADD CONSTRAINT "_ArmyToUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
