import {AcademicLevel} from './AcademicLevel';
import {User} from './User';

export interface Profiles{
  id: number ;
  user: User;
  academicLevel: AcademicLevel;
  skill: string;
  desiredSalary: string;
  desiredWorkingAddress: string;
  numberYearsExperience: number;
  delete: number;
}
