import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()    
    username: string;
    @Expose()
    email: string;
    password?: string;
    @Expose()
    street: string;
    @Expose()
    suite: string;
    @Expose()
    city: string;
    @Expose()
    zipcode: string;
    @Expose()
    lat: number;
    @Expose()
    lng: number;
    @Expose()
    phone: string;
    @Expose()
    website: string;
    @Expose()
    companyName: string;
    @Expose()
    companyCatchPhrase: string;
    @Expose()
    companyBs: string;
}