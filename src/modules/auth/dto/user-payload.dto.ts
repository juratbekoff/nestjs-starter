export class UserPayloadDto {
  id: number;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  iat?: number;
  exp?: number;
}
