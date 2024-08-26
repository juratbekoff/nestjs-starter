import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  password: string;
}
