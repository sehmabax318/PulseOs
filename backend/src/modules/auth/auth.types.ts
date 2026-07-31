export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}