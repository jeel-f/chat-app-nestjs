import { IsEmail, IsNotEmpty, IsOptional} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;

  @IsOptional()
  username: string;

}
