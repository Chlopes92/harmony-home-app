export interface LoginResponse {
    token: string;
    user: User;
}

export interface DeleteAccountResponse {
    message: string;
  }

export interface User {
    id: number;
    name: string;
    firstname: string;
    email: string;
    password: string;
    phone: string;
}