import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { jokeService } from './joke.service';
import { JwtAuthGuard } from 'src/sign-up/auth-guard';
@Controller('api')
export class jokeController {
  constructor(private jokeService: jokeService) {}
  
  @Get('random-joke')
  @UseGuards(JwtAuthGuard)
  getRandomJoke() {
  return this.jokeService.getRandomJoke();
}
}
