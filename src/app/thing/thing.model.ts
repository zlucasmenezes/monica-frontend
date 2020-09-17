import { IRelayPopulated } from 'src/app/relay/relay.model';
import { IProject, IProjectPopulated } from '../project/project.model';
import { IDocument } from '../shared/models/backend.model';
import { ISensorPopulated } from './../sensor/sensor.model';

export interface IThing extends IDocument {
  name: string;
  type: string;
  project: IProject['_id'];
}

export type IThingPopulated = Pick<IThing, Exclude<keyof IThing, 'project'>> & {
  project: IProjectPopulated;
  sensors: ISensorPopulated[];
  relays: IRelayPopulated[];
};

export interface IBoard extends IDocument {
  password: string;
}
