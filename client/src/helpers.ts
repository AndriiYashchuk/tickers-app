import { domain } from './constants';

// eslint-disable-next-line no-unused-vars
type ScriptSetter = (script: string) => void;

export const fetchWebAppScript = (setScript: ScriptSetter): void => {
  fetch(domain)
    .then(response => response.json())
    .then(data => {
      setScript(data.mainScript);
    })
    .catch(err => {
      console.error(err);
    });
};
