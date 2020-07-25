import { IDocument } from '../shared/models/backend.model';
import { IProject } from '../project/project.model';

export interface IThing extends IDocument {
  name: string;
  type: string;
  project: IProject['_id'];
}
