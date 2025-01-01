export interface RegisterUser {
  fullName: string;
  email: string;
  password: string;
}

export interface User extends RegisterUser {
  id: string;
}
