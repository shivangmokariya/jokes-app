import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.header('Authorization');
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = decoded;
      
          if (decoded.id !== request.user.id) {
            throw new UnauthorizedException('Invalid token for this user', 'Forbidden');
          }
    
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token', 'Forbidden');
    }
  }
}
