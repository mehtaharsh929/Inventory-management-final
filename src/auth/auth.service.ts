import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

   let remo= await bcrypt.compare(password, user.password)

    console.log('user', user,remo)

    if (user && (await bcrypt.compare(password, user.password))) {
      return { message: 'Login successful', user };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async generateJwtToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByUsername(createUserDto.username);

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10); // Hash the password
    return this.usersService.createUser(createUserDto.username, createUserDto.password,UserRole.USER);
  }
}
