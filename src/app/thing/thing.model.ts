import { IDocument } from '../shared/models/backend.model';
import { IProject, IProjectPopulated } from '../project/project.model';

export interface IThing extends IDocument {
  name: string;
  type: string;
  project: IProject['_id'];
}

export type IThingPopulated = Pick<IThing, Exclude<keyof IThing, 'project'>> & {
  project: IProjectPopulated;
};

export interface IBoard extends IDocument {
  password: string;
}
