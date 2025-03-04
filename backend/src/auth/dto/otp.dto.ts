import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator"; 

export class OtpDto {
    @IsEmail()
    @IsNotEmpty({ message: "Email is required" })
    readonly email: string;

    @IsNumberString()
    @IsNotEmpty({ message: "Otp is Required" })
    readonly otp: string; // Change to string
}
