import { domain } from './constants';

export const fetchWebAppScript = (setScript: (script: string) => void): void => {
  fetch(domain)
    .then((response) => response.json())
    .then((data) => {
      setScript(data.mainScript);
    });
}
