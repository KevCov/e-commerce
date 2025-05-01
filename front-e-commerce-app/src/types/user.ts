export interface UserCredentials {
  email: string;
  password: string;
}

export interface Address {
  department: string;
  province: string;
  district: string;
  street: string;
  houseNumber?: number;
  zipCode?: number;
}

interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  dni?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  address?: Address;
}

export interface newUser {
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber?: string;
  userLogin: UserLogin;
  address?: Address;
}