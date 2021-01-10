import { IDocument } from '../shared/models/backend.model';
import { IThing } from '../thing/thing.model';
import { IThingPopulated } from './../thing/thing.model';

export interface ISensor extends IDocument {
  name: string;
  type: ISensorType['_id'];
  thing: IThing['_id'];
  pin: number;
  pollTime: number;
  store: boolean;
  function: string;
  config: ISensorParameters[];
  upcomingChanges: ISensorChanges;
}

interface ISensorChanges {
  name: string;
  pin: number;
  pollTime: number;
  store: boolean;
  function: string;
  config: ISensorParameters[];
}

export type ISensorPopulated = Pick<ISensor, Exclude<keyof ISensor, 'type' | 'thing'>> & {
  type: ISensorType;
  thing: IThingPopulated;
};

export interface ISensorType extends IDocument {
  type: string;
  input: InputType;
  function: string;
  config: ISensorConfig[];
}

export interface ISensorConfig {
  parameter: string;
  description: string;
  default: number;
}

export interface ISensorParameters {
  parameter: string;
  value: number;
}

export type InputType = 'Analog' | 'Digital';
