import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { TipoModule } from './tipo/tipo.module';
import { UserModule } from './user/user.module';
import { AtividadeModule } from './atividade/atividade.module';
import { SetorModule } from './setor/setor.module';
import { ProcessoPModule } from './processo-p/processop.module';
import { CartorioModule } from './cartorio/cartorio.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    TipoModule,
    UserModule,
    AtividadeModule,
    SetorModule,
    CartorioModule,
    ProcessoPModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
