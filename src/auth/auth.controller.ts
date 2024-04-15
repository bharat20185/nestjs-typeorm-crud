import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, UsePipes } from "@nestjs/common";
import { ControllerInterceptor } from "../interceptors/controller.interceptor";
import { Serialize } from "../interceptors/serialize.interceptors";
import { Public } from "src/common/decorators/public.decorator";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UserDto } from "src/users/dto/user.dto";
import { User } from "src/users/entities/user.entity";
import { UserInterceptor } from "src/users/interceptors/user.interceptors";
import { AuthToken } from "src/users/interface/user.interface";
import { UserTransformPipe } from "src/users/pipes/user-transform.pipe";
import { UsersService } from "src/users/users.service";

@Controller('/auth')
@UseInterceptors(ControllerInterceptor)
@Public()
export class AuthController {

    constructor(private userService: UsersService) {}

    @Post('/signup')
    @Serialize(UserDto)
    @UseInterceptors(UserInterceptor)
    signup(@Body(UserTransformPipe) createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body('email') email: string, @Body('password') password: string): Promise<AuthToken> {
        console.log(email, password);
        return this.userService.login(email, password);
    }

}