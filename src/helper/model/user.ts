import { IChallenge } from "./challenge"

export interface IUser {
    "ryzlyPoints": number,
    "achievements": string[],
    badgeLevel: string[],
    "_id": string,
    "isDeleted": false,
    "createdAt": string,
    "updatedAt": string,
    "email": string,
    "isCoach": true,
    "skills": string[],
    "interests": string[],
    "about": string,
    "fullName": string,
    "firstName": string,
    "lastName": string,
    "profilePicture": string,
    "track": string,
    "country": string,
    "phone": string,
    "username": string,
    "challenges": IChallenge[],
    "facebookUsername": string,
    "twitterUsername": string,
    "instagramUsername": string,
    "LinkedinUsername": string,
    "tiktokUsername": string,
    isSuspended: boolean
} 

// badgeLevel: null | string;
// createdAt: string;
// email: string;
// interets: string[];
// isCoach: boolean;
// isDeleted: boolean;
// isSuspended: boolean;
// ryzlyPoints: number;
// skills: string[];
// updatedAt: string;
// userType: "learner" | string;
// about: string;
// fullName: string;
// phone: string;
// track: string;
// username: string;
// country: string;
// profilePicture: string;
// _id: string;
// firstName: string;
// lastName: string;

export interface IProfile { 
    "email"?: string,  
    "phone": string,
    "country": string, 
    "username": string,
    "skills": Array<string>,
    "interets": Array<string>, 
    "about": string,
    "fullName": string,
    "profilePicture"?: string,
    "track": string
}