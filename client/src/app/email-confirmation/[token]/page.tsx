'use client'
import React  from 'react';
import EmailConfirmation from '../../../components/EmailConfirmation';

interface Props {
  params: {
    token: string;
  }
  searchParams: {
    id: string
  }
}

const EmailConfirmationPage = (props: Props) => {
  const {
    params: { token },
    searchParams: { id: userId }
  } = props;

  return (
      <EmailConfirmation token={token} userId={userId} />
  );
}

export default EmailConfirmationPage;
