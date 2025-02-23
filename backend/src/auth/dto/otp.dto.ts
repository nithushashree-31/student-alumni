import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class OtpDto{
    @IsEmail()
    @IsNotEmpty({message:"Email is required"})
    readonly email: string;
    @IsNumber()
    @IsNotEmpty({message:"Otp is Required"})
    readonly otp:number;
}