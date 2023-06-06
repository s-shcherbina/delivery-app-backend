import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
