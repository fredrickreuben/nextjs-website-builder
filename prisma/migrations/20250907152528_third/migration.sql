/*
  Warnings:

  - You are about to drop the column `position` on the `sections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."sections" DROP COLUMN "position",
ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 0;
