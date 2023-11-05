import { AxiosAdapter, AxiosPromise, AxiosResponse } from 'axios';

const fetchAdapter: AxiosAdapter = (config): AxiosPromise<AxiosResponse> => {
  // @ts-ignore
  return fetch(`${config.baseURL ? config.baseURL : ''}${config.url}`, {
    method: config.method,
    headers: config.headers,
    body: config.data,
  }).then(async response => {
    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      responseData = await response.text();
    }
    return {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config,
      request: response,
    };
  })
    .catch(error => {
      console.error('Fetch adapter error:', error);
    });
};

export default fetchAdapter;
