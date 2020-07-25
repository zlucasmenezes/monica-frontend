import { IDocument } from '../shared/models/backend.model';
import { IThing } from '../thing/thing.model';

export interface ISensor {
  name: string;
  type: ISensorType['_id'];
  thing: IThing['_id'];
  pin: number;
  pollTime: number;
  store: boolean;
  decimalPlaces: number;
  function: string;
  config: ISensorParameters[];
}

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
