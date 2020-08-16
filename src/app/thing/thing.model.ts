import { ISensor } from './../sensor/sensor.model';
import { IDocument } from '../shared/models/backend.model';
import { IProject, IProjectPopulated } from '../project/project.model';

export interface IThing extends IDocument {
  name: string;
  type: string;
  project: IProject['_id'];
}

export type IThingPopulated = Pick<IThing, Exclude<keyof IThing, 'project'>> & {
  project: IProjectPopulated;
  sensors: ISensor[];
};

export interface IBoard extends IDocument {
  password: string;
}
