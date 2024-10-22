// Add these interfaces to the existing types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  balance: number;
  createdAt: Date;
  twoFactorEnabled: boolean;
  twoFactorMethod: '2FA_EMAIL' | '2FA_AUTHENTICATOR' | null;
  twoFactorSecret?: string;
}

export interface TwoFactorResponse {
  tempToken: string;
  qrCodeUrl?: string;
  method: '2FA_EMAIL' | '2FA_AUTHENTICATOR';
}

export interface VerifyTwoFactorRequest {
  code: string;
  tempToken: string;
}