import { CreateUserDTO } from 'src/modules/users/dto';

export interface PayloadToken {
  id: number;
  role: string;
}

export interface AuthResponse {
  userData: CreateUserDTO;
  token: string;
}

export interface OrderParams {
  userId?: number;
  completed?: boolean;
}

export interface OrderGoodParams {
  goodId: number;
  orderId: number;
}
