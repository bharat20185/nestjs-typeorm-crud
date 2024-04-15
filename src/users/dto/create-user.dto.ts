import { Transform, Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class GeoDto {
  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  lng: number;
}

class AddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  suite: string;
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  //@Max(6)
  //@Min(6)
  zipcode: string;

  @IsObject()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => GeoDto)
  geo: GeoDto;
}

class CompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  catchPhrase: string;
  @IsNotEmpty()
  @IsString()
  bs: string;
}

export class CreateUserDto {

  constructor() {}

  id!: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  //@Transform(username => username.trim())
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Type(() => AddressDto)
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  address: AddressDto;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  website: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;
}
