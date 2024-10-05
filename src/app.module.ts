import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { database_config } from './config/configuration.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      load: [database_config],
      cache: true,
      expandVariables: true,
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string()
      //     .valid('development', 'production', 'test', 'provision', 'staging').default('development'),
      //   PORT: Joi.number().default(3000),
      // }),
      // validationOptions: {
      //   abortEarly: false,
      // },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
