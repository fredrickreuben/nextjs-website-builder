/*
  Warnings:

  - You are about to drop the column `index` on the `sections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."sections" DROP COLUMN "index",
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;
