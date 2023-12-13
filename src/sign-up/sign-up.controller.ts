import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import {
  CreateSignUpDto,
  CreateLoginDto,
  Data,
} from './dto/create-sign-up.dto';
import { JwtAuthGuard } from './auth-guard';


@Controller('api/users')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('signup')
  create(@Body() createSignUpDto: CreateSignUpDto) {
    return this.signUpService.create(createSignUpDto);
  }

  @Post('login')
  Login(@Body() CreateLoginDto: CreateLoginDto) {
    return this.signUpService.login(CreateLoginDto);
  }

  @Get('me/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.signUpService.findOne(id);
  }

  @Post('logout/:id')
  async logout(@Param() userId: string) {
    await this.signUpService.logout(userId);
    return { message: 'Successfully logged out', status: 200 };
  }
}
