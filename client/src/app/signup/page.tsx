'use client'
import React from 'react';
import AuthForm from '../../components/AuthForm';
import { SIGN_UP_PROPS } from '../../components/constants';
import { ToSignUpFromLink } from '../../components/ToSignUpFromLink';


const Signup = () => (
  <AuthForm
    {...SIGN_UP_PROPS}
  >
    <ToSignUpFromLink isSignUp />
  </AuthForm>
);

export default Signup;
