import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  thumbnailUrl: string;
}
