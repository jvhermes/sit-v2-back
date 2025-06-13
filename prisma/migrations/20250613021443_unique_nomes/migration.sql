/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `TipoDeProcesso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `atividades` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `departamentos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `setores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TipoDeProcesso_nome_key" ON "TipoDeProcesso"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "atividades_nome_key" ON "atividades"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "departamentos_nome_key" ON "departamentos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "setores_nome_key" ON "setores"("nome");
