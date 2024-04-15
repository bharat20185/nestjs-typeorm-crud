import { IsBoolean, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { UserTokenPayload } from "src/users/interface/user.interface";

export class CreateTodoDto {
    id!: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsOptional()
    completed: boolean;

    user: UserTokenPayload;
}
