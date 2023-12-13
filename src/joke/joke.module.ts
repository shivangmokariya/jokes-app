import { Module } from '@nestjs/common';
import { jokeService } from './joke.service';
import { jokeController } from './joke.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule,
    JwtModule.register({ 
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [jokeController],
  providers: [jokeService],
})
export class jokeModule {}
