import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserTransformPipe implements PipeTransform {
  transform(body: CreateUserDto, metadata: ArgumentMetadata): any {
    return {
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
      street: body.address.street,
      suite: body.address.suite,
      city: body.address.city,
      zipcode: body.address.zipcode,
      lat: body.address.geo.lat,
      lng: body.address.geo.lng,
      phone: body.phone,
      website: body.website,
      companyName: body.company.name,
      companyCatchPhrase: body.company.catchPhrase,
      companyBs: body.company.bs,
    };
  }
}
