import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAnswerDto {
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  body: string;
}
