import { Tree } from 'typeorm';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoNuiteeModule } from './nuitee/nuitee.module';
import { InfoRegModule } from './registros/reg.module';

@Module({
  imports: [ InfoNuiteeModule,InfoRegModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'bdpostgrest.postgres.database.azure.com',
      port: 5432,
      username: 'apiuser',
      password: 'elS3n0R3S!*a',
      database: 'mibdaz',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      ssl: true, // Habilita la opción SSL
      extra: {
        ssl: {
          rejectUnauthorized: false, // Puedes necesitar ajustar esta opción dependiendo de tu entorno
        },
      },
    }),
  ],
 // controllers: [AppController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
