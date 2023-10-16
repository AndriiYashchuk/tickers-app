import { AxiosError } from 'axios';

export const logResponseError = (error: unknown): void => {
  if(error instanceof AxiosError){
    console.error(`
AXIOS ERROR:
${error.config ? 'baseUrl: ' + error.config.baseURL : ''}
${error.config ? 'url: ' + error.config.url : ''}
${error.config ? 'method: ' + error.config.method : ''}
code: ${error.code}
status: ${error.message}
${error.response ? 'body: ' + error.response.data : ''}`);
  } else {
    console.error(error);
  }
}
