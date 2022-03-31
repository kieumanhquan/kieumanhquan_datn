import {Role} from './Role';

export interface User{
  id: number;
  fullName: string;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  homeTown: string;
  avatarName: string;
  gender: string;
  birthday: Date;
  roles: Role[];
  active: boolean;
  delete: boolean;
}
