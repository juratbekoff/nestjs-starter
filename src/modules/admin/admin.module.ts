import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [PrismaModule, AuthModule],
  exports: [AdminService],
})
export class AdminModule {}
