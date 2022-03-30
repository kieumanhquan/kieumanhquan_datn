import {User} from './User';
import {Type} from './Type';

export interface Notifications{
  id: number;
  sender: User;
  receiver: User;
  dateInterview: Date;
  content: string;
  res: number;
  type: Type;
  delete: boolean;
}
