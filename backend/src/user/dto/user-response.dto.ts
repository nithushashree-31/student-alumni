import { Role } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponse {
    userId: number;
    firstName: string;
    lastName: string | null;
    email: string;
    role: Role;
    isActive: boolean;

    @Exclude()
    password: string;
    @Exclude()
    lastLogin: Date | null;
    @Exclude()
    mfaOtp: number | null;
    @Exclude()
    mfaOtpStartTime: Date | null;
    @Exclude()
    createdBy: number | null;
    @Exclude()
    createdAt: Date;
    @Exclude()
    modifiedBy: number | null;
    @Exclude()
    modifiedAt: Date;

    isDeleted: boolean;

    constructor(partial: Partial<UserResponse>) {
        Object.assign(this, partial);
    }
}