import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      module: PrismaModule,
      global: true,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}
