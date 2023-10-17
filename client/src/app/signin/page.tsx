'use client'
import React from 'react';
import AuthForm from '../../components/AuthForm';
import { SIGN_IN_PROPS } from '../../components/constants';
import { ToSignUpFromLink } from '../../components/ToSignUpFromLink';
import DynamicLayout from '../../components/layouts/main/DynamicLayout';


const Signin = () => (
  <DynamicLayout
    currentUser={null}
  >
     <AuthForm
       {...SIGN_IN_PROPS}
     >
        <ToSignUpFromLink />
     </AuthForm>
  </DynamicLayout>
);

export default Signin;
