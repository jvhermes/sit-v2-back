/*
  Warnings:

  - You are about to drop the column `created_at` on the `LoteVinculado` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `LoteVinculado` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `lotes` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `lotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LoteVinculado" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "created_at",
DROP COLUMN "updated_at";
