/*
  Warnings:

  - You are about to drop the column `metadata` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailSprites` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnails` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `trimmed` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `Media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "metadata",
DROP COLUMN "thumbnailSprites",
DROP COLUMN "thumbnails",
DROP COLUMN "trimmed",
DROP COLUMN "uid";
