import { signUp, signUpSchema } from './schema/sign-up.schema';
import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpController } from './sign-up.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: signUp.name, schema: signUpSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
