import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({ require_tld: true }, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @MinLength(3)
  @MaxLength(40)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(6, {
    message:
      'Password is too short. Minimum length is $constraint1 characters.',
  })
  @MaxLength(20, {
    message: 'Password is too long. Maximum length is $constraint1 characters.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
