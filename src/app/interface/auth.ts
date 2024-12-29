export interface RegisterPostData {
  fullName: string;
  email: string;
  password: string;
}

export interface User extends RegisterPostData {
  id: string;
}

export interface sendCreditForm {
  id: string;
  email: string;
  file: File[] | null | undefined;
  months: string;
  amount: number;
}
