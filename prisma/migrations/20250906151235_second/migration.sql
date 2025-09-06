-- AlterTable
ALTER TABLE "public"."projects" ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "live_url" TEXT,
ADD COLUMN     "tags" TEXT;
