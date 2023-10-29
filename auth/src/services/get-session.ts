import jwt from 'jsonwebtoken';

export const getSession = async (user: {id: string; email: string; isAdmin: boolean}): Promise<{ jwt: string }> => {
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
}
