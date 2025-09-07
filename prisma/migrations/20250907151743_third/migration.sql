-- CreateEnum
CREATE TYPE "public"."SectionType" AS ENUM ('Text', 'Image', 'Video', 'TextImage', 'Layout');

-- CreateTable
CREATE TABLE "public"."sections" (
    "id" SERIAL NOT NULL,
    "type" "public"."SectionType" NOT NULL,
    "project_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."texts" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL DEFAULT '<h1>Your Heading</h1><p>Enter your text here...</p>',
    "section_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "texts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_project_sections" ON "public"."sections"("project_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "texts_section_id_key" ON "public"."texts"("section_id");

-- AddForeignKey
ALTER TABLE "public"."sections" ADD CONSTRAINT "sections_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."texts" ADD CONSTRAINT "texts_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
