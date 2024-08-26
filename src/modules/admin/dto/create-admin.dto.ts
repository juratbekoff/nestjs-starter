import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  password: string;
}
