export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  sex: string;
  birthdate: string;
  roles: Role[];
}

export interface Role {
  id?: string;
  name: string;
  description?: string;
}
