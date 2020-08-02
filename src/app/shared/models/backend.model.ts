export interface IResponse {
  message: string;
  data?: any;
  error?: Error;
}

export interface IDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
