export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: "doctor" | "receptionist" | "admin";
  phone?: string;
  avatar?: string;
}

export interface UpdateUserInput {
  name?: string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
}