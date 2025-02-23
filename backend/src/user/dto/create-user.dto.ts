import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;
    
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsEmail({ require_tld: true })
    readonly email: string;
    
    @IsStrongPassword({ minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    readonly password: string;

    @IsEnum(Role)
    readonly role: Role;
}
