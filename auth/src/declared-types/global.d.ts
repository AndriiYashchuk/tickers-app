interface UserParams {
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

declare global {
  function signin(user?: UserParams): Promise<string []>;
}

export {};
