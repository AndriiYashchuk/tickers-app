export interface JwtUser {
  email: string;
  id: string;
  iat: number;
  isAdmin?: boolean;
}
