import { useState } from 'react';

export const useSignupForm = (resetForm?: () => void) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  // eslint-disable-next-line no-unused-vars
  const onChanged = (onChange: (value: string) => void) =>
    (e: any) => {
      if (resetForm) {
        resetForm();
      }
      onChange(e.target.value);
    };
  const handleEmail = onChanged(setEmail);
  const handlePassword = onChanged(setPassword);
  const handleName = onChanged(setName);
  const handleSurname = onChanged(setSurname);

  return {
    email, handleEmail,
    password, handlePassword,
    name, handleName,
    surname, handleSurname
  };
};
