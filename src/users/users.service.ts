import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createUser(username: string, password: string, role: UserRole): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure the role is a valid enum value
    const validRole = Object.values(UserRole).includes(role) ? role : UserRole.USER;

    // Create the user object properly
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      role: validRole,
    });

    return this.usersRepository.save(newUser);
  }
}
