import { IThingPopulated } from '../thing/thing.model';
import { IDocument } from '../shared/models/backend.model';
import { IThing } from '../thing/thing.model';

export interface IRelay extends IDocument {
  name: string;
  thing: IThing['_id'];
  pin: number;
  store: boolean;
}

export type IRelayPopulated = Pick<IRelay, Exclude<keyof IRelay, 'thing'>> & {
  thing: IThingPopulated;
};
