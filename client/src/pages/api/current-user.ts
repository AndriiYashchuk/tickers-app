import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { base64UrlDecode } from '../../utils/base64UrlDecode';

const currentUser = (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = req.cookies;
  const session = cookies.session;

  if(session) {
    try {
      const { jwt: jwtToken } = JSON.parse(base64UrlDecode( session || ''));
      const user = jwt.verify(
        jwtToken,
        process.env.JWT_KEY!
      )

      // If user is authenticated, continue to the page
      return res.status(200)
        .json({ currentUser: user });
    } catch (err) {
      console.error(err)
    }
  }

  return res.status(200)
    .json({ currentUser: null });
}

export default currentUser;
