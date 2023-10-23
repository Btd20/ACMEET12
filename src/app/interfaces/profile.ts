export interface profile {
  id: string;
  userName : string;
  normalizedUserName: string;
  email: string;
  profilepictureId: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  RoleId?: string;
  Name?: string;
}

