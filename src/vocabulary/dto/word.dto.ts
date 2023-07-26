import { IsNotEmpty, IsString } from "class-validator";

export class WordDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly transcription: string;

  @IsNotEmpty()
  @IsString()
  readonly translation: string;
}
