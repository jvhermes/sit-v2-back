/*
  Warnings:

  - You are about to drop the column `processoCartorioId` on the `LoteVinculado` table. All the data in the column will be lost.
  - You are about to drop the column `processoPrefeituraId` on the `LoteVinculado` table. All the data in the column will be lost.
  - You are about to drop the column `processo_id` on the `descricao-p` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LoteVinculado" DROP CONSTRAINT "LoteVinculado_processoCartorioId_fkey";

-- DropForeignKey
ALTER TABLE "LoteVinculado" DROP CONSTRAINT "LoteVinculado_processoPrefeituraId_fkey";

-- DropForeignKey
ALTER TABLE "descricao-p" DROP CONSTRAINT "descricao-p_processo_id_fkey";

-- AlterTable
ALTER TABLE "LoteVinculado" DROP COLUMN "processoCartorioId",
DROP COLUMN "processoPrefeituraId";

-- AlterTable
ALTER TABLE "descricao-p" DROP COLUMN "processo_id",
ADD COLUMN     "processo_prefeitura_id" INTEGER;

-- AddForeignKey
ALTER TABLE "LoteVinculado" ADD CONSTRAINT "LoteVinculado_processo_prefeitura_id_fkey" FOREIGN KEY ("processo_prefeitura_id") REFERENCES "processos-p"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteVinculado" ADD CONSTRAINT "LoteVinculado_processo_cartorio_id_fkey" FOREIGN KEY ("processo_cartorio_id") REFERENCES "processo-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processo_prefeitura_id_fkey" FOREIGN KEY ("processo_prefeitura_id") REFERENCES "processos-p"("id") ON DELETE SET NULL ON UPDATE CASCADE;
