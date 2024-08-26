import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, LoginAdminDto } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('create')
  public CreateAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public Login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.loginAdmin(loginAdminDto);
  }
}
