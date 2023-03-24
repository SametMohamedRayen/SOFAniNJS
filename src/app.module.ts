import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from './conifg';
import { environments } from './environments';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'mysql',
          host: configService.mysql.host,
          port: configService.mysql.port,
          database: configService.mysql.name,
          username: configService.mysql.user,
          password: 'password', //configService.mysql.password,
          synchronize: true,
          autoLoadEntities: true,
          keepConnectionAlive: true,
        };
      },
    }),
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
