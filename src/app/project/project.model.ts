import { IUser } from '../auth/auth.model';
import { IDocument } from '../shared/models/backend.model';

export type Privacy = 'public' | 'private';

export interface IProject extends IDocument {
  name: string;
  description?: string;
  admin: IUser['_id'];
  privacy: Privacy;
  users: IUser['_id'][];
}
