import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
