declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export {}
