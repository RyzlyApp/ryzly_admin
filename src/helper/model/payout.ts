import { IUser } from "./user";

export interface IPayout {
    "_id": string,
    "isDeleted": boolean,
    "userId": IUser,
    "amount": number,
    "bankId": string,
    "status": string,
    "createdAt": string,
    "updatedAt": string, 
    user?: IUser;
}