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
import { ProcessoCModule } from './processo-c/processoc.module';
import { AuthModule } from './auth/auth.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    TipoModule,
    UserModule,
    AtividadeModule,
    SetorModule,
    CartorioModule,
    ProcessoPModule,
    ProcessoCModule,
    AuthModule,
    CsvModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
