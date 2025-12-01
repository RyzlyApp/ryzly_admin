export interface IUser {
  badgeLevel: null | string;
  createdAt: string;
  email: string;
  interets: string[];
  isCoach: boolean;
  isDeleted: boolean;
  isSuspended: boolean;
  ryzlyPoints: number;
  skills: string[];
  updatedAt: string;
  userType: "learner" | string;
  about: string;
  fullName: string;
  phone: string;
  track: string;
  username: string;
  country: string;
  profilePicture: string;
  _id: string;
  firstName: string;
  lastName: string;
}