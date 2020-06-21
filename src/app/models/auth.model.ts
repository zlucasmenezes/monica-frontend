export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IToken {
  token: string;
  userId: string;
  exp: number;
}

export interface ISignUpRequest {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}
