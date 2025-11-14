import { IUser } from "./user";


export interface IApplication {
    "_id": string,
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "userId": string,
    user: IUser,
    "expertise": string,
    "yearsOfExperience": number,
    "linkedInUrl": string,
    "portfolioUrl": string,
    "focusArea": string,
    "status": string,
} 