import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiregs } from './entity/reg.entity';
import { registerservice } from "./reg.service";
import { RegController } from "./reg.controller";


@Module({
  imports: [ TypeOrmModule.forFeature([entitiregs
  ]),],
  providers: [registerservice],
  exports: [registerservice],
  controllers: [RegController],
})
export class InfoRegModule {}
