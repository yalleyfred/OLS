import { Profile, User } from "@prisma/client";
import { CreateProfileDto, EditProfileDto } from "../dto/Profile.dto";


export interface IUsersService {
    createUserProfile(userId: number, profile: CreateProfileDto): Promise<User>
    getUsers(userId:number): Promise<User[]>;
    getUsersById(userId: number, id:number): Promise<User>
    updateUserProfile(profile:EditProfileDto, userId: number, id:number): Promise<User>;
    deleteUserProfile(userId: number, id:number): Promise<void>;
    changeAccountStatus(userId: number, id:number): Promise<void>
}