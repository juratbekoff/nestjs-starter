import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto, LoginAdminDto } from './dto';
import { compare, hash } from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createAdmin(data: CreateAdminDto) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: {
          username: data.username,
        },
      });

      if (admin) {
        return new BadRequestException(
          `Admin with username ${data.username} already exists!`,
        );
      }

      data.password = await hash(data.password, 10);

      const createAdmin = await this.prisma.admin.create({
        data,
      });

      return {
        message: `Admin is created successfully!`,
        Id: createAdmin.id,
      };
    } catch (err) {
      throw err;
    }
  }

  async loginAdmin(data: LoginAdminDto) {
    try {
      const adminByUsername = await this.prisma.admin.findUnique({
        where: {
          username: data.username,
        },
      });

      if (!adminByUsername) {
        throw new UnauthorizedException(`username yoki parol xato!`);
      }

      if (!(await compare(data.password, adminByUsername.password))) {
        throw new UnauthorizedException(`username yoki parol xato!`);
      }

      const { accessToken, refreshToken } =
        await this.authService.generateTokens(adminByUsername);

      return {
        message: `Welcome back ${adminByUsername.name}`,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw err;
    }
  }
}
