import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    body: string;
}
