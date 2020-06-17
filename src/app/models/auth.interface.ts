export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface ISignUpRequest {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}
