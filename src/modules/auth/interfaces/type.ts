export interface LoginInput {
  username: string;
  password: string;
}
export interface TokenInfo {
  scope: string;
  username: string;
  iat: number;
  exp: number;
  roles: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dob: Date;
}
