import jwt from 'jsonwebtoken';

interface Params {
  id: string;
  email: string;
  isAdmin: boolean;
}

export const getSession = async (user: Params): Promise<{ jwt: string }> => {
  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY!
  );

  return {
    jwt: userJwt
  };
};
