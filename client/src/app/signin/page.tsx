'use client'
import React from 'react';
import AuthForm from '../../components/AuthForm';
import { SIGN_IN_PROPS } from '../../components/constants';
import { ToSignUpFromLink } from '../../components/ToSignUpFromLink';


const Signin = () => (
   <AuthForm
     {...SIGN_IN_PROPS}
   >
      <ToSignUpFromLink />
   </AuthForm>
);

export default Signin;
