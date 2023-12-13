
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignUpModule } from './sign-up/sign-up.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jokeModule } from './joke/joke.module';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    SignUpModule,
    jokeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    try {
      await MongooseModule.forRootAsync({});
      this.logger.log('Database connection successful');
    } catch (error) {
      this.logger.error(`Database connection error: ${error.message}`, '', 'DatabaseConnectionError');
      process.exit(1);
    }
  }
}
