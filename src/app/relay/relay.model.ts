import { IDocument } from '../shared/models/backend.model';
import { IThing, IThingPopulated } from '../thing/thing.model';

export interface IRelay extends IDocument {
  name: string;
  thing: IThing['_id'];
  pin: number;
  button: number;
  store: boolean;
  nc: boolean;
}

export type IRelayPopulated = Pick<IRelay, Exclude<keyof IRelay, 'thing'>> & {
  thing: IThingPopulated;
};
