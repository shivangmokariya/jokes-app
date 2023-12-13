import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import * as bcrypt from 'bcrypt';
import { signUp, Auth } from './schema/sign-up.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignUpService {
  static Auth: any;
  constructor(
    @InjectModel(signUp.name)
    private Auth: Model<Auth>,
    private JwtService: JwtService,
  ) {}

  create = async (createSignUpDto: CreateSignUpDto) => {
    
    const model = new this.Auth(createSignUpDto);
    const data = await this.Auth.findOne({ email: model.email });
    if (!data) {
      model.password = await bcrypt.hash(model.password, 10);
      model.save();
      return { message: 'Registered successfully', status: 200, data: model };
    } else {
      throw new HttpException(
        'Email id is already exist',
        HttpStatus.FORBIDDEN,
      );
    }
  };

  login = async (CreateLoginDto) => {
    const model = new this.Auth(CreateLoginDto);
    const user = await this.Auth.findOne({
      email: model.email,
    }).exec();
  
    if (user) {
      const isMatch = await bcrypt.compare(model.password, user.password);
  
      if (isMatch) {
        const jwt = await this.JwtService.signAsync({ id: user._id }, { secret: process.env.JWT_SECRET });
        user.token = jwt;
  
        await user.save();
  
        return {
          status: 200,
          msg: 'successfully logged in',
          Data: user,
        };
      } else {
        throw new HttpException(
          'password is incorrect',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
    } else {
      throw new HttpException(
        'Email Id is incorrect',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  };
  findOne = async (id: string)=> {
    try {
      const user = await this.Auth.findOne({ _id: id });
      if (user) {
        return {
          status: 200,
          data: user,
          msg: `User with ID ${id} found.`,
        };
      } else {
        throw new HttpException(`User with ID ${id} not found.`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Unable to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  logout = async (userId: any) => {
    try {
      const { id } = userId;
      const result: UpdateWriteOpResult = await this.Auth.updateOne({ _id: id }, { $set: { token: null } });
  
      if (result.modifiedCount > 0) {
        return { message: 'Logout successful', status: HttpStatus.OK };
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  };
  
}
