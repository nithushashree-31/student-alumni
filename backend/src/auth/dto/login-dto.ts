import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "Invalid email format" })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

