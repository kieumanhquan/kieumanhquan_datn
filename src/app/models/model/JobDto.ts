import {JobPosition} from './JobPosition';
import {AcademicLevel} from './AcademicLevel';
import {Rank} from './Rank';
import {User} from './User';
import {StatusJob} from './StatusJob';

export interface JobDto{
  updateDate: Date;
  updateUserId: number;
  id: number;
  name: string;
  jobPositionId: number;
  numberExperience: number;
  addressWork: string;
  academicLevelId: AcademicLevel;
  rankId: number;
  qtyPerson: number;
  createDate?: Date;
  dueDate: Date;
  skills: string;
  startRecruitmentDate?: Date;
  description: string;
  benefits: string;
  salaryMax: number;
  salaryMin: number;
  contactId: number;
  statusJobId: number;
  views: number;
  creatorId: number;
  delete?: boolean;
}
