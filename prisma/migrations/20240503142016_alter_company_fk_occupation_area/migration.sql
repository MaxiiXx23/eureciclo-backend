/*
  Warnings:

  - You are about to drop the column `companyId` on the `OccupationArea` table. All the data in the column will be lost.
  - Added the required column `occupationAreaId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OccupationArea" DROP CONSTRAINT "OccupationArea_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "occupationAreaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OccupationArea" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_occupationAreaId_fkey" FOREIGN KEY ("occupationAreaId") REFERENCES "OccupationArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
