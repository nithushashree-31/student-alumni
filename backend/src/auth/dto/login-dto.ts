import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{

    @IsString()
    @IsEmail({require_tld:true})
    readonly email:string;

    @IsNotEmpty()
    readonly password:string;
}