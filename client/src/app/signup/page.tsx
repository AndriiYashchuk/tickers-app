'use client'
import React from 'react';
import AuthForm from '../../components/AuthForm';
import { SIGN_UP_PROPS } from '../../components/constants';
import { ToSignUpFromLink } from '../../components/ToSignUpFromLink';
import DynamicLayout from '../../components/layouts/main/DynamicLayout';


const Signup = () => (
  <DynamicLayout
    currentUser={null}
  >
    <AuthForm
      {...SIGN_UP_PROPS}
    >
      <ToSignUpFromLink isSignUp />
    </AuthForm>
  </DynamicLayout>
);

export default Signup;
