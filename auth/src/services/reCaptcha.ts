import axios from 'axios';

const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

export const validateRecaptcha = async (token: string, clientIp?: string): Promise<boolean> => {
  const secretKey = process.env.RECAPTCHA_KEY;

  try{
    const { data } = await axios.post(RECAPTCHA_URL, {
      secret: secretKey,
      response: token,
      remoteip: clientIp,
    }, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    });

    return data.success;
  } catch (e){
    console.error(e);
    return false;
  }
}
